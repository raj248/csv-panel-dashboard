// import { SidebarTrigger } from "../ui/sidebar";
// import { Separator } from "../components/ui/separator";
// import { AppBreadcrumbs } from "./app-breadcrumbs";
import { ModeToggle } from "../components/theme/mode-toggle";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authApi";
import { MainNav } from "@/components/nav/MainNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const style = "glass"; // any style name from docs

function Header() {
  const navigator = useNavigate();
  const uri = `https://api.dicebear.com/9.x/${style}/svg?randomizeIds=false`;

  return (
    <header className="mt-2 flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Avatar>
          <AvatarImage src={uri} alt="@avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <MainNav />

        <div className="ml-auto flex items-center gap-2">
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
