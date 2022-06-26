export interface ExtractParams {}

export abstract class Config {
  abstract extract($: cheerio.Root, $el: cheerio.Cheerio, opts?: ExtractParams): any
}
