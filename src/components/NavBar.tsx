"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SteamLoginButton } from "@/components/SteamLoginButton";
import { useRouter } from "next/navigation";
import { LayoutDashboard, BookText, LogOut } from "lucide-react";

export const NavBar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  // const handleDashboard = () => {
  //   router.push("/dashboard");
  // };

  const handleProfile = () => {
    router.push("/profil");
  };

  const iconSize = 16;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              as="a"
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              <span>CounterCheater</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Button
              as="a"
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-background"
            >
              Signalements
            </Button>
            <Button
              as="a"
              href="/statistics"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-background"
            >
              Statistiques
            </Button>
            <Button
              as="a"
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-background"
            >
              À propos
            </Button>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isPending ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session?.user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform hover:scale-110"
                    size="sm"
                    src={session.user.image || undefined}
                    name={session.user.name || "User"}
                    showFallback
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu">
                  <DropdownItem
                    key="profil"
                    onPress={handleProfile}
                    className="h-14 gap-2"
                    textValue="Profile"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {session.user.name || "Utilisateur"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email || "Email non disponible"}
                      </span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key="dashboard"
                    onPress={() => router.push("/dashboard")}
                    startContent={
                      <LayoutDashboard size={iconSize} />
                    }
                  >
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    key="my-reports"
                    onPress={() => router.push("/my-reports")}
                    startContent={
                      <BookText size={iconSize} />
                    }
                  >
                    Mes signalements
                  </DropdownItem>
                  {/* <DropdownItem
                    key="settings"
                    onPress={() => router.push("/settings")}
                    startContent={
                      <Settings size={iconSize} />
                    }
                  >
                    Paramètres
                  </DropdownItem> */}
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onPress={handleSignOut}
                    startContent={
                      <LogOut size={iconSize} />
                    }
                  >
                    Se déconnecter
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <SteamLoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
