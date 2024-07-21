import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Le jeu de devinette contre une IA
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Mettez votre intelligence à l'épreuve contre un adversaire IA
                  dans un jeu palpitant de devinettes de mots. Gagnez des
                  points, accumulez les victoires et prouvez votre maîtrise.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Jouer
                </Link>
                <Link
                  to="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Fonctionnalités clés
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Défi contre l'IA, un gameplay captivant
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ce jeu offre une expérience unique et captivante, vous opposant
                à un adversaire IA redoutable dans une bataille d'intelligence
                et de maîtrise des mots. Découvrez les fonctionnalités clés du
                jeu et comprenez pourquoi il s'agit du défi ultime de devinettes
                de mots.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Adversaire IA"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Une IA redoutable</h3>
                <p className="text-muted-foreground">
                  Affrontez une IA très intelligente qui s'adapte à votre style
                  de jeu et vous défie avec une large gamme de mots.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">
                  Mécanismes de Devinettes Intuitifs
                </h3>
                <p className="text-muted-foreground">
                  Identifiez rapidement les mots et les images grâce à une
                  interface conviviale qui fournit des retours utiles.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Système de Score</h3>
                <p className="text-muted-foreground">
                  Gagnez des points pour vos devinettes précises, et accumulez
                  vos victoires face à l'IA pour montrer votre maîtrise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Démo du Jeu
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Découvrez le Jeu en Action
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Regardez la vidéo ci-dessous pour voir le jeu en action et avoir
                un aperçu du gameplay excitant et de l'adversaire IA.
              </p>
            </div>
            <div className="aspect-video w-full max-w-4xl rounded-xl overflow-hidden">
              {/*
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Démo du jeu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
