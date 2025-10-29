// import { SidebarTrigger } from "../ui/sidebar";
// import { Separator } from "../components/ui/separator";
// import { AppBreadcrumbs } from "./app-breadcrumbs";
import { ModeToggle } from "../components/theme/mode-toggle";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authApi";

function Header() {
  const navigator = useNavigate();

  return (
    <header className="mt-2 flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <h1 className="text-base font-medium mr-4">Admin Panel </h1> */}

        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/raj248/institute_app"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
          <Button
            variant="outline"
            asChild
            size="sm"
            className="hidden sm:flex cursor-pointer"
            onClick={() => {
              logoutUser();
              navigator("/");
            }}
          >
            <a className="dark:text-foreground">Logout</a>
          </Button>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
