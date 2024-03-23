/// <reference types="@types/cheerio/index.d.ts" />

import { load } from 'cheerio';
import { Config } from './config';
import { rootProp } from './core/property';

export { ConfigFactory } from './config';

export function extract<T = unknown>(
  $: cheerio.Root | string,
  config: Config<T>,
  url: string
): T {
  let $root = $;

  if (typeof $root === 'string') {
    $root = load($root);
  }

  return config.extract({
    $: $root,
    $el: $root.root(),
    property: rootProp,
    url,
  });
}
