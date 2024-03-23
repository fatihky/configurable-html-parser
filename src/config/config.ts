export interface ExtractParams {
  $: cheerio.Root;
  $el: cheerio.Cheerio;
  url: string;
}

export abstract class Config<T = unknown> {
  abstract extract(params: ExtractParams): T;
}
