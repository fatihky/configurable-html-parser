import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { TRANSFORMER_DEFINITION_REGEX } from './transformers/factory';

export const schema: SomeJSONSchema = {
  type: 'object',
  required: [],
  oneOf: [
    {
      $comment: 'WithSelector',
      properties: {
        selector: {
          oneOf: [{
            type: 'string',
            minLength: 1
          }, {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            minItems: 1
          }]
        },
        type: {
          type: 'string',
          enum: ['string', 'object', 'array', 'union'],
        },
        items: { $ref: '#/' } as any,
        properties: {
          type: 'object',
          additionalProperties: {
            $ref: '#/',
          },
        },
        transform: {
          oneOf: [{
            type: 'string',
            pattern: TRANSFORMER_DEFINITION_REGEX,
          }, {
            type: 'array',
            items: {
              type: 'string',
              pattern: TRANSFORMER_DEFINITION_REGEX,
            },
            minItems: 1,
          }],
        },
      },
      required: [],
      additionalProperties: false,
      allOf: [
        {
          $comment: 'when the "properties" present, "type" can only be "object" or not defined at all',
          if: {
            required: ['properties'],
          },
          then: {
            properties: {
              type: { const: 'object' },
            },
          },
        },
        {
          $comment: 'when the "type" is "object", then the "properties" MUST be defined.',
          if: {
            properties: {
              type: { const: 'object' },
            },
            required: ['type'],
          },
          then: {
            required: ['properties'],
          },
        },
        {
          $comment: "objects cannot have transform",
          if: {
            anyOf: [{
              properties: {
                type: { const: 'object' },
              },
              required: ['type'],
            }, {
              required: ['properties']
            }]
          },
          then: {
            allOf: [{
              required: ['properties'],
            }, {
              not: {
                required: ['transform']
              }
            }]
          }
        },
        {
          $comment: 'when the "items" present, "type" can only be "array" or not defined at all',
          if: {
            required: ['items'],
          },
          then: {
            properties: {
              type: { const: 'array' },
            },
          },
        },
        {
          $comment: 'when the "type" is "array", then the "properties" MUST be defined.',
          if: {
            properties: {
              type: { const: 'array' },
            },
            required: ['type'],
          },
          then: {
            oneOf: [{
              required: ['items']
            }, {
              required: ['transform']
            }]
          },
        },
      ],
    },

    {
      $comment: 'Union',
      type: 'object',
      properties: {
        union: {
          type: 'array',
          items: {
            $ref: '#/',
          } as any,
          minItems: 1,
        },
      },
      required: ['union'],
      additionalProperties: false,
    },

    {
      $comment: 'Constant',
      type: 'object',
      properties: {
        constant: {} as any,
      },
      required: ['constant'],
      additionalProperties: false,
    },
  ],
};
