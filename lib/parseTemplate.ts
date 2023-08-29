import type { Template } from '@aws-sdk/client-ses';
import { promises } from 'fs';
import { resolve } from 'path';
import { TemplateMeta } from './models/template-meta';

const { readFile } = promises;

export async function parseTemplate(root: string): Promise<Template> {
  const html = await readFile(resolve(root, 'index.html'), 'utf-8');
  const text = await readFile(resolve(root, 'index.txt'), 'utf-8');
  const metaJson = await readFile(resolve(root, 'meta.json'), 'utf-8');
  const meta: TemplateMeta = JSON.parse(metaJson);

  return {
    TemplateName: meta.name,
    SubjectPart: meta.subject,
    HtmlPart: html,
    TextPart: text,
  };
}
