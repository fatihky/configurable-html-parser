import { Property } from '../core/property';

export interface ExtractParams {
  $: cheerio.Root;
  $el: cheerio.Cheerio;
  url: string;
  property: Property;
}

export abstract class Config<T = unknown> {
  abstract extract(params: ExtractParams): T;
}
