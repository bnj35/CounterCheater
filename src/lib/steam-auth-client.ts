import type { steamAuthPlugin } from './steam-auth-plugin';
import type { BetterAuthClientPlugin } from 'better-auth/client';

export const steamAuthClient = () => {
  return {
    id: 'steam-auth-client',
    $InferServerPlugin: {} as ReturnType<typeof steamAuthPlugin>,
  } satisfies BetterAuthClientPlugin;
};
