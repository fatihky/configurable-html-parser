import Ajv from 'ajv';
import * as schema from './config-schema.json';

const ajv = new Ajv();

expect.extend({
  toBeValidConfig: function (received) {
    const result = ajv.validate(schema, received);

    return {
      message: () =>
        `Expected ${JSON.stringify(received)} ` +
        (this.isNot
          ? 'to be an invalid config. But it threw no validation errors'
          : `to be a valid Config. Got: ${JSON.stringify(ajv.errors)}`),
      pass: result,
    };
  },

  toExtract() {
    return {
      message: () => '',
      pass: true,
    };
  },
});
