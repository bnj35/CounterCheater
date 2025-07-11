"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'missing_request_url':
        return "URL de requête manquante";
      case 'steam_openid_validation_failed':
        return "Échec de la validation OpenID Steam";
      case 'steamid_missing':
        return "ID Steam manquant";
      case 'steam_profile_fetch_failed':
        return "Échec de la récupération du profil Steam";
      case 'steam_profile_not_found':
        return "Profil Steam non trouvé";
      case 'user_or_account_not_found':
        return "Utilisateur ou compte non trouvé";
      default:
        return "Une erreur d'authentification s'est produite";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Erreur d'authentification
          </h1>
          <p className="text-gray-600 mb-6">
            {getErrorMessage(error)}
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => router.push("/")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Retour à l'accueil
            </button>
            <button 
              onClick={() => router.back()}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
