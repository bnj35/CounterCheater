import Image from "next/image";
import styles from "./scss/page.module.css";
import { SteamLoginButton } from "@/components/SteamLoginButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">CounterCheater</h1>
          <p className="text-center text-gray-600 mb-6">
            Signaler et combattre les tricheurs dans Counter-Strike
          </p>
          <div className="flex justify-center">
            <SteamLoginButton />
          </div>
        </div>

        <ol>
          <li>
            Get started by signing in with Steam to report cheaters.
          </li>
          <li>Help create a better gaming experience for everyone.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://github.com/CounterCheater"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/github.svg"
              alt="GitHub logo"
              width={20}
              height={20}
            />
            View on GitHub
          </a>
          <a
            href="https://steamcommunity.com/dev/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Get Steam API Key
          </a>
        </div>
      </main>
    </div>
  );
}
