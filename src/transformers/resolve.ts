import { URL } from 'url';
import { PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class ResolveTransformer extends Transformer {
  static getName(): string {
    return 'resolve';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return STRING;
  }

  transform(val: any, _$el: cheerio.Cheerio, url: string) {
    if (typeof val === 'string') {
      return new URL(val, url).toString();
    }

    throw new Error(
      `ResolveTransformer.transform: invalid value type: ${typeof val}`
    );
  }
}
