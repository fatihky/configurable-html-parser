export interface ExtractParams {
  url: string;
}

export abstract class Config {
  abstract extract(
    $: cheerio.Root,
    $el: cheerio.Cheerio,
    opts: ExtractParams
  ): any;
}
