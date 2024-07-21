import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ModeToggle } from "@/components/mode-toggle";
import GitHubIcon from "@/components/icons/github";
import GamepadIcon from "@/components/icons/gamepad";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <GamepadIcon className="h-6 w-6" />
          <span className="sr-only">Devinette IA</span>
        </Link>
        <div className="ml-auto flex gap-4 sm:gap-6 items-center">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              to="/stats"
              className="text-sm font-medium hover:underline underline-offset-4"
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Bryan Florestal, Tous droits
          réservés.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            href="https://github.com/bflorestal/devinette-ia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs hover:underline underline-offset-4"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </footer>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
