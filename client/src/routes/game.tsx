import { createFileRoute } from "@tanstack/react-router";
import Guess from "@/components/guess";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  return (
    <>
      <section className=""></section>
      <section className="">
        <Guess />
      </section>
    </>
  );
}
