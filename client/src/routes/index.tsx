import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="container flex flex-col items-center justify-center py-8">
      <div className="max-w-5xl space-y-8 md:max-w-3xl">
        <h1 className="via-accent-foreground bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-center text-3xl font-bold leading-10 text-transparent drop-shadow-sm md:text-4xl md:leading-[3rem]">
          Devinette IA
        </h1>
        <p className="text-center md:text-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
          vitae qui voluptates numquam deserunt, tenetur praesentium veritatis
          quaerat libero labore!
        </p>
      </div>
    </section>
  );
}
