import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';

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

  transform({ val }: TransformParams) {
    if (typeof val === 'string') {
      return Number(val);
    }

    throw new Error(
      `NumberTransformer.transform: invalid value type: ${typeof val}. value=${JSON.stringify(
        val
      )}`
    );
  }
}
