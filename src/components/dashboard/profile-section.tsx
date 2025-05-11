import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3 } from "lucide-react";

export default function ProfileSection() {
  // Placeholder data
  const user = {
    name: "Demo User",
    email: "user@example.com",
    username: "demouser123",
    avatarUrl: "https://picsum.photos/100/100?random=3",
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your personal information and account settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
              <Edit3 className="mr-2 h-4 w-4" /> Change Avatar
            </Button>
            <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={user.name} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={user.username} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="********" className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter new password" className="mt-1 bg-background" />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
}
