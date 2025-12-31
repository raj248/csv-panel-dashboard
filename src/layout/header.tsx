// src/components/layout/Header.tsx
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { logoutUser } from "@/services/authApi";
import { useAuth } from "@/context/auth-context";
import { ModeToggle } from "../components/theme/mode-toggle";
import { MainNav } from "@/components/nav/MainNav";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming your context provides this
  const style = "glass";
  const avatarUri = `https://api.dicebear.com/9.x/${style}/svg?seed=${
    user?.name || "default"
  }`;

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="mt-2 border-b flex h-16 shrink-0 items-center transition-all px-4 lg:px-6">
      <div className="flex w-full items-center gap-4">
        <MainNav />

        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={avatarUri} alt="@user" />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "John Doe"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "john@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/profile" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Detail</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/update-password">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Update Password</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
