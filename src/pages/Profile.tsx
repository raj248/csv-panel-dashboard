// src/pages/Profile.tsx
import { useAuth } from "@/context/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Calendar, Shield, MapPin } from "lucide-react";

const ProfilePage = () => {
  const { user, isAdmin } = useAuth();
  const avatarUri = `https://api.dicebear.com/9.x/glass/svg?seed=${
    user?.name || "default"
  }`;

  // Dummy additional info
  const profileData = {
    joinedDate: "October 2023",
    location: "New York, USA",
    bio: isAdmin
      ? "Lead Publisher at Excellence Press. Managing over 50 authors and global distribution."
      : "Full-time Author and Novelist. Specializing in Science Fiction and Thrillers.",
  };

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side: Basic Info Card */}
        <Card className="w-full md:w-1/3">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl mb-4">
              <AvatarImage src={avatarUri} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user?.name || "John Doe"}</h2>
            <Badge variant={isAdmin ? "default" : "secondary"} className="mt-2">
              {isAdmin ? "Publisher (Admin)" : "Author"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-4 italic">
              "{profileData.bio}"
            </p>
          </CardContent>
        </Card>

        {/* Right Side: Account Details */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Manage your public and private information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-xs uppercase text-muted-foreground tracking-wider">
                    Email Address
                  </Label>
                  <p className="text-sm font-medium">
                    {user?.email || "john.doe@example.com"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-xs uppercase text-muted-foreground tracking-wider">
                    Location
                  </Label>
                  <p className="text-sm font-medium">{profileData.location}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-xs uppercase text-muted-foreground tracking-wider">
                    Member Since
                  </Label>
                  <p className="text-sm font-medium">
                    {profileData.joinedDate}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-xs uppercase text-muted-foreground tracking-wider">
                    Account Role
                  </Label>
                  <p className="text-sm font-medium">
                    {isAdmin
                      ? "Full Publishing Privileges"
                      : "Standard Author Access"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
