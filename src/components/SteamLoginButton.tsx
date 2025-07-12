"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { SteamIcon } from "@/components/Icons/SteamIcon";
import { Button } from "@heroui/react";

export const SteamLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSteamLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-in/steam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callbackURL: "/dashboard",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error("Steam login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Steam login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <button
    //   onClick={handleSteamLogin}
    //   disabled={isLoading}
    //   className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors disabled:opacity-50"
    // >
    //   <SteamIcon size={20} color="white" />
    //   {isLoading ? "Connexion..." : "Se connecter avec Steam"}
    // </button>
    <Button
      color="default"
      className="bg-black text-white"
      startContent={<SteamIcon size={20} color="white" />}
      onPress={handleSteamLogin}
      isLoading={isLoading}
    >
      {isLoading ? "Connexion..." : "Se connecter avec Steam"}
    </Button>
  );
};
