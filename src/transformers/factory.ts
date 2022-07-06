import { Transformer } from "../core/transformer";
import { Transformers } from "./transformers";

export const TRANSFORMER_DEFINITION_REGEX = '^[\\w-]+(\\(([\\w-]+|(([\\w-]+\\s*,\\s*)*[\\w-]+))?\\))?$';

const TRANSFORMER_NAME_REGEX = /^([\w-]+[^\(])/;
const TRANSFORMER_ARGUMENT_PARANTHESIS_REGEX = /\(([\w-]+\s*,?\s*)*\)/;
const TRANSFORMER_ARGUMENT_NAME_REGEX = /[\w-]+/g;

export class TransformerFactory {
  static create(transform: string): Transformer {
    const transformerName = TransformerFactory.extractTransformerName(transform);
    const args = TransformerFactory.extractTransformerArgs(transform);
    const TransfomerImpl = Transformers.getByName(transformerName);

    if (!TransfomerImpl) {
      throw new Error(`Transformer with name "${transformerName}" not found.`);
    }

    return new TransfomerImpl(args);
  }

  private static extractTransformerName(def: string) {
    const matches = def.match(TRANSFORMER_NAME_REGEX);

    if (matches === null) {
      throw new Error(`Invalid transformer name: ${def}`);
    }
 
    return matches[0]
  }

  private static extractTransformerArgs(def: string) {
    const argsParanthesisMatch = def.match(TRANSFORMER_ARGUMENT_PARANTHESIS_REGEX);

    if (argsParanthesisMatch === null) {
      return [];
    }

    const argMatches = argsParanthesisMatch[0].match(TRANSFORMER_ARGUMENT_NAME_REGEX);

    if (argMatches === null) {
      return []
    }

    return argMatches;
  }
}
