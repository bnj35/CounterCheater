"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import Image from 'next/image';

export default function Header() {
  // This is a placeholder for your actual authentication state.
  // You would replace this with a hook from your auth provider (e.g., useSession from NextAuth.js).
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userProfileImage = null; // Placeholder for user's profile image URL

  return (
    <header className="bg-background-700/80 backdrop-blur-sm text-text shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Counter Cheater
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                 {userProfileImage ? (
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={userProfileImage}
                      alt="User profile"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <div className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  <Button variant="bordered" color="secondary" onPress={() => setIsLoggedIn(false)}>
                    Sign Out
                  </Button>
              </div>
            ) : (
              <Button color="primary" onPress={() => setIsLoggedIn(true)}>
                <div className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}