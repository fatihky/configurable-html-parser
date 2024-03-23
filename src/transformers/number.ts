import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';
import { InvalidParseInputError } from '../errors/invalid-parse-input-error';

export default class NumberTransformer extends Transformer {
  static getName(): string {
    return 'number';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return NUMBER;
  }

  transform({ property, val }: TransformParams) {
    if (typeof val === 'string') {
      return Number(val);
    }

    throw new InvalidParseInputError(
      property,
      `NumberTransformer.transform: invalid value type: ${typeof val}. value=${JSON.stringify(
        val
      )}`
    );
  }
}
