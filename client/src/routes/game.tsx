import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  return (
    <>
      <section className=""></section>
      <section className=""></section>
    </>
  );
}
