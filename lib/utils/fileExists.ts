import { promises } from 'fs';

const { stat } = promises;

export const fileExists = async (path: string) =>
  !!(await stat(path).catch((e) => false));
