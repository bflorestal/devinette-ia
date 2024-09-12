import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

/*
async function sendGuess(text: string) {
  // Call the API to check if the player's guess is correct
  // If correct, set isCorrect to true
  // If incorrect, set isCorrect to false

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
*/

const formSchema = z.object({
  playerGuess: z.string().min(3, {
    message: "Veuillez entrer une réponse",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

/**
 * Get a random image in JPEG fromat from the assets folder.
 * @returns The URL of the random image.
 * @example
 * const randomImage = getRandomImage();
 * console.log(randomImage); // "/assets/random-image.jpg"
 */
function getRandomImage() {
  const images = import.meta.glob("../assets/*.jpg", {
    eager: true,
  });

  const imageKeys = Object.keys(images);
  const randomImageKey =
    imageKeys[Math.floor(Math.random() * imageKeys.length)];

  const randomImage: unknown = images[randomImageKey];

  const validatedRandImg = z.object({ default: z.string() }).parse(randomImage);

  return validatedRandImg.default;
}

/** Extract the image name from the URL.
 * @param url - The URL of the image.
 * @returns The name of the image.
 */
function extractImageName(url: string | undefined): string {
  return url?.split("/").pop() || "animal-image.jpg";
}

/**
 * Send the data of the game to the API.
 * @param imageFile The name of the image file.
 * @param playerGuess The animal guessed by the player.
 * @param aiGuess The animal guessed by the AI.
 *
 * @example
 * sendGameData("animal-image.jpg", "cat", "dog");
 */
async function sendGameData(
  imageFile: string,
  user: { id: string; guess: string },
  aiGuess: string,
) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_file: imageFile,
        user: {
          id: user.id,
          guess: user.guess,
        },
        model: {
          id: "66e32b4927e3fad8473fb1ba",
          guess: aiGuess,
        },
        correct_answer: aiGuess,
      }),
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi des données de la partie à l'API :",
      error,
    );
  }
}

export default function Guess() {
  const [aiGuess, setAiGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [userId, setUserId] = useLocalStorage("userId", "");

  useEffect(() => {
    if (!userId || userId.length === 0) {
      const newUserId = Math.random().toString(36).substring(2, 15);
      setUserId(newUserId);
    }
  }, [userId, setUserId]);

  const {
    data: imageURL,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["animal-image"],
    queryFn: getRandomImage,
    refetchOnWindowFocus: false,
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerGuess: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const guess = values.playerGuess.trim().toLowerCase();
    if (!guess || guess.length === 0 || !imageURL) return;
    setIsPlayerTurn(false);

    try {
      const formData = new FormData();
      const response = await fetch(imageURL);
      const blob = await response.blob();

      formData.append("file", blob, imageURL.split("/").pop());

      const predictionResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/predict`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!predictionResponse.ok) {
        throw new Error("Something went wrong");
      }

      const predictionData = await predictionResponse.json();
      setAiGuess(predictionData.prediction);
      setIsCorrect(guess === predictionData.prediction);

      await sendGameData(
        extractImageName(imageURL),
        { id: userId, guess },
        predictionData.prediction,
      );

      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image :", error);
      setIsPlayerTurn(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background md:min-h-[36rem]">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="mx-auto text-2xl font-bold">
            Devinez ce que c'est !
          </span>
        </div>
        <div className="rounded-md">
          <AnimalImage
            isLoading={isLoading}
            isError={isError}
            imageURL={imageURL}
          />
        </div>
        <div className="flex items-center gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-center justify-center gap-2"
            >
              <FormField
                control={form.control}
                name="playerGuess"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Votre réponse"
                        minLength={3}
                        pattern="[a-zA-Z]+"
                        required
                        disabled={isLoading || isError}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isPlayerTurn || !imageURL}>
                Deviner
              </Button>
            </form>
          </Form>
        </div>
        <div
          className={`h-6 text-center ${isCorrect ? "text-green-500" : "text-red-500"}`}
        >
          {aiGuess ? (
            isCorrect ? (
              <p>
                <strong>Correct !</strong> L'IA a aussi donné la bonne réponse.
              </p>
            ) : (
              <p>
                <strong>Faux !</strong> Réponse de l'IA : {aiGuess}
              </p>
            )
          ) : null}
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            onClick={() => {
              refetch();
              setAiGuess("");
              setIsCorrect(null);
              setIsPlayerTurn(true);
            }}
          >
            Nouvelle partie
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AnimalImageProps {
  isLoading: boolean;
  isError: boolean;
  imageURL: string | undefined;
}

function AnimalImage({ isLoading, isError, imageURL }: AnimalImageProps) {
  if (isLoading)
    return (
      <img
        src="/placeholder.svg"
        alt="Image à deviner"
        width={224}
        height={224}
        className="mx-auto object-cover"
      />
    );

  if (isError) return <p>Erreur lors du chargement de l'image</p>;

  if (imageURL)
    return (
      <img
        src={imageURL}
        alt="Image à deviner"
        width={224}
        height={224}
        className="mx-auto object-cover"
      />
    );
}
