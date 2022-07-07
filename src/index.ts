import { load } from 'cheerio';
import { Config } from './config';

export { ConfigFactory } from './config';

export function extract($: cheerio.Root | string, config: Config): any {
  let $root = $;

  if (typeof $root === 'string') {
    $root = load($root);
  }

  return config.extract($root, $root.root());
}
