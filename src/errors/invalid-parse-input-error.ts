import { Property } from '../core/property';

export class InvalidParseInputError extends Error {
  constructor(readonly property: Property, message?: string) {
    super(message);
  }
}
