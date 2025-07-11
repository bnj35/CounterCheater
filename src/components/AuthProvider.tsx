"use client";

import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Better Auth ne nécessite pas de Provider wrapper
  // Le client d'authentification fonctionne directement
  return <>{children}</>;
}
