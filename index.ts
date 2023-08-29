import { resolve } from 'path';
import { fileExists } from './lib/utils/fileExists';
import { uploadTemplate } from './lib/createTemplate';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const { key, profile, region } = yargs(hideBin(process.argv))
  .options({
    key: {
      alias: 'k',
      describe: 'The key of the template',
      type: 'string',
      requiresArg: true,
      demandOption: true,
    },
    profile: {
      alias: 'p',
      describe: 'The credentials profile to connect with AWS',
      type: 'string',
      requiresArg: true,
      demandOption: true,
    },
    region: {
      alias: 'r',
      describe: 'The AWS region to use',
      type: 'string',
      requiresArg: true,
      demandOption: true,
    },
  })
  .help()
  .parseSync();

(async function main() {
  const templatesPath = resolve('./templates', key);

  if (!(await fileExists(templatesPath))) {
    console.warn(`No templates exist for "${key}".`);
    return;
  }

  await uploadTemplate(templatesPath, profile, region);
})();
