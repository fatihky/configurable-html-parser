import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class MatchCount extends Transformer {
  static getName(): string {
    return 'match-count';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return NUMBER;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    return $el.length;
  }
}
