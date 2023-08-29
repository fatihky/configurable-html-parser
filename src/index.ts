/// <reference types="@types/cheerio/index.d.ts" />

import { load } from 'cheerio';
import { Config } from './config';

export { ConfigFactory } from './config';

export function extract<T = unknown>(
  $: cheerio.Root | string,
  config: Config,
  url: string
): T {
  let $root = $;

  if (typeof $root === 'string') {
    $root = load($root);
  }

  return config.extract($root, $root.root(), { url });
}
