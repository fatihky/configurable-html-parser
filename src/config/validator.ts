import Ajv from 'ajv';
import { schema } from '../config-schema';

const ajv = new Ajv();

export class ConfigValidator {
  constructor(private readonly plain: any) {}

  validate(): typeof ajv['errors'] {
    ajv.validate(schema, this.plain);

    return ajv.errors;
  }
}
