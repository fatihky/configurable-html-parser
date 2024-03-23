import { ARRAY, ComplexTypes, OBJECT } from './complex-types';
import { BOOLEAN, NUMBER, PrimitiveTypes, STRING } from './primitive-types';

export type ArgumentTypes = PrimitiveTypes | ComplexTypes;

export function argTypeToStr(typ: ArgumentTypes) {
  switch (typ) {
  case STRING:
    return 'string';
  case NUMBER:
    return 'number';
  case BOOLEAN:
    return 'boolean';
  case OBJECT:
    return 'object';
  case ARRAY:
    return 'array';
  default:
    throw new Error(`Unrecognized argument type: ${typ}`);
  }
}
