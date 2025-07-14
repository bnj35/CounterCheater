"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, Button, Card, CardBody, CardHeader, Spinner, Chip } from "@heroui/react";
import { LogOut, Edit, Mail, BarChart2 } from "lucide-react";
import Link from "next/link";
import { SteamIcon } from "@/components/Icons/SteamIcon";
import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  role?: string | null;
  steamProfileUrl?: string | null;
  participationCount?: number | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const sessionUser = session?.user;
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!isSessionPending && !sessionUser) {
      router.push('/');
    }
  }, [isSessionPending, sessionUser, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (sessionUser?.id) {
        try {
          setProfileLoading(true);
          const response = await fetch(`/api/users/${sessionUser.id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("Failed to fetch user data");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        } finally {
          setProfileLoading(false);
        }
      }
    };

    fetchUser();
  }, [sessionUser?.id]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isSessionPending || isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p>Could not load user profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 full-height">
      <Card className="bg-background-800/50 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <Avatar 
            src={user.image || undefined} 
            name={user.name || "User"}
            size="lg"
            className="w-24 h-24 text-4xl"
            showFallback
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-text-500">{user.username}</p>
            {user.role && <Chip color="primary" variant="flat" size="sm" className="mt-2">{user.role}</Chip>}
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-2">User Information</h3>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-text-400" />
                <span>{user.email}</span>
              </div>
              {user.steamProfileUrl && (
                <div className="flex items-center gap-3">
                  <SteamIcon size={20} />
                  <Link href={user.steamProfileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Steam Profile
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-3">
                <BarChart2 size={20} className="text-text-400" />
                <span>{user.participationCount || 0} reports submitted</span>
              </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-lg font-semibold border-b pb-2 mb-2">Actions</h3>
               <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="flat" startContent={<Edit size={16} />}>
                    Edit Profile
                </Button>
                <Button color="danger" variant="flat" onPress={handleSignOut} startContent={<LogOut size={16} />}>
                    Sign Out
                </Button>
               </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}