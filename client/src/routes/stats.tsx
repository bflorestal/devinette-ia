import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats")({
  component: Stats,
});

function Stats() {
  return (
    <>
      <section className=""></section>
      <section className=""></section>
    </>
  );
}
