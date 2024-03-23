import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';
import { InvalidParseInputError } from '../errors/invalid-parse-input-error';

export default class Length extends Transformer {
  static getName(): string {
    return 'length';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return NUMBER;
  }

  transform({ property, val }: TransformParams) {
    if (typeof val === 'string' || Array.isArray(val)) {
      return val.length;
    }

    throw new InvalidParseInputError(
      property,
      `Length.transform: invalid value type: ${typeof val}`
    );
  }
}
