import { SESClient } from '@aws-sdk/client-ses';
import { fromIni } from '@aws-sdk/credential-providers';

export const createSesClient = (profile: string, region: string) => new SESClient({
  region,
  credentials: fromIni({ profile }),
});
