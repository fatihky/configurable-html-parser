import AttributeTransformer from './attr';
import ExistsTransformer from './exists';
import HTMLTransformer from './html';
import LengthTransformer from './length';
import MatchCountTransformer from './match-count';
import NumberTransformer from './number';
import TrimTransformer from './trim';

export class Transformers {
  static readonly transformers = [
    ExistsTransformer,
    HTMLTransformer,
    LengthTransformer,
    MatchCountTransformer,
    NumberTransformer,
    TrimTransformer,
    AttributeTransformer,
  ];

  static getByName(name: string) {
    return this.transformers.find(tr => tr.getName() === name);
  }
}
