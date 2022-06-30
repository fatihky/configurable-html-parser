import { Config, ExtractParams } from "../config";

export default class ConstantConfig extends Config {
  private constructor(private readonly val: any) {
    super();
  }

  extract($: cheerio.Root, $el: cheerio.Cheerio, opts?: ExtractParams | undefined) {
    return this.val;
  }

  static generate(val: any) {
    return new ConstantConfig(val);
  }
}
