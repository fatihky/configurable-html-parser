import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Transformers } from './transformers';

const validTransformers = Transformers.transformers.map(tr => tr.getName());

export const schema: SomeJSONSchema = {
  type: 'object',
  required: [],
  oneOf: [
    {
      $comment: 'WithSelector',
      properties: {
        selector: { type: 'string' },
        type: {
          type: 'string',
          enum: ['string', 'object', 'array', 'union'],
        },
        items: { $ref: '#/' },
        properties: {
          type: 'object',
          additionalProperties: {
            $ref: '#/',
          },
        },
        transform: {
          oneOf: [{
            type: 'string',
            enum: validTransformers,
          }, {
            type: 'array',
            items: {
              type: 'string',
              enum: validTransformers,
            },
            minItems: 1,
          }],
        },
      },
      required: ['selector'],
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
          },
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
        constant: {},
      },
      required: ['constant'],
      additionalProperties: false,
    },
  ],
};