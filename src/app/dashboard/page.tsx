"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
          <p className="mb-4">Vous devez être connecté pour accéder à cette page.</p>
          <button 
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Bienvenue dans votre espace personnel !</p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Informations utilisateur</h2>
            <div className="space-y-2">
              <p><strong>Nom:</strong> {session.user?.name || 'Non défini'}</p>
              <p><strong>Email:</strong> {session.user?.email || 'Non défini'}</p>
              {session.user?.image && (
                <div className="flex items-center gap-2">
                  <strong>Avatar:</strong>
                  <img 
                    src={session.user.image} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
