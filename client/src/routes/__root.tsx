import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-gray-700/80 shadow-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Link
            to="/"
            className="[&.active]:font-bold transition-opacity hover:opacity-90 text-lg"
          >
            Accueil
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
