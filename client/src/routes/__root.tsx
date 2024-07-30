import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import GitHubIcon from "@/components/icons/github";
import GamepadIcon from "@/components/icons/gamepad";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link to="/" className="flex items-center justify-center">
          <GamepadIcon className="h-6 w-6" />
          <span className="sr-only">Devinette IA</span>
        </Link>
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              to="/stats"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Statistiques
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Bryan Florestal, Tous droits
          réservés.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <a
            href="https://github.com/bflorestal/devinette-ia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs underline-offset-4 hover:underline"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </footer>
      <Toaster richColors />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});
