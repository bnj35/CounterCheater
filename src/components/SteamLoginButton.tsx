"use client";

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
