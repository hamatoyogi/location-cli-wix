import { dashboard } from '@wix/dashboard';
import { createClient } from '@wix/sdk';

export const client = createClient({
  host: dashboard.host(),
  auth: dashboard.auth(),
  modules: {
    dashboard,
  },
});

export const navigateToSettings = () =>
  client.dashboard.navigate('71e35f24-8eb7-41b0-b261-c2259a76372f');
