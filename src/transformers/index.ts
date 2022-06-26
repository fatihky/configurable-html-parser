import ExistsTransformer from './exists';
import LengthTransformer from './length';
import MatchCountTransformer from './match-count';
import NumberTransformer from './number';
import TrimTransformer from './trim';

export class Transformers {
  static readonly transformers = [
    new ExistsTransformer(),
    new LengthTransformer(),
    new MatchCountTransformer(),
    new NumberTransformer(),
    new TrimTransformer(),
  ];

  static getByName(name: string) {
    return this.transformers.find(tr => tr.getName() === name);
  }
}
