import {
  CreateTemplateCommand,
  CreateTemplateCommandInput,
  GetTemplateCommand,
  SESClient,
  Template,
  UpdateTemplateCommand,
} from '@aws-sdk/client-ses';
import { parseTemplate } from './parseTemplate';
import { createSesClient } from './sesClient';

const templateExists = async (client: SESClient, templateName: string) => {
  const command = new GetTemplateCommand({ TemplateName: templateName });

  try {
    await client.send(command);
    return true;
  } catch (err) {
    return false;
  }
};

export const uploadTemplate = async (
  templatesPath: string,
  profile: string,
  region: string
) => {
  const template = await parseTemplate(templatesPath);
  const client = createSesClient(profile, region);

  const exists = await templateExists(client, template.TemplateName ?? '');
  const command = exists
    ? new UpdateTemplateCommand({ Template: template })
    : new CreateTemplateCommand({ Template: template });

  try {
    return await client.send(command);
  } catch (err) {
    console.log('Failed to upload template.', err);
    return err;
  }
};
