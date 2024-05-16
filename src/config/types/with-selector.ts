import { Config, ExtractParams } from '../config';

export interface ConfigWithSelectorExtractParams extends ExtractParams {
  elementAlreadyMatched?: boolean;
}

export default abstract class ConfigWithSelector extends Config {
  protected selector: string | null = null;

  abstract extract(params: ConfigWithSelectorExtractParams): unknown;

  getSelectorMatches(
    $: cheerio.Cheerio,
    alreadyMatched: boolean
  ): cheerio.Cheerio {
    if (alreadyMatched) {
      return $;
    }

    if (this.selector === null) {
      return $;
    }

    // check if the element *itself* matches the given selector
    if ($.is(this.selector)) {
      return $;
    }

    return $.find(this.selector);
  }
}
