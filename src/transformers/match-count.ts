import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';

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

  transform({ $el }: TransformParams) {
    return $el.length;
  }
}
