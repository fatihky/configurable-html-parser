import { Config } from '../config';

export default class ConstantConfig extends Config {
  private constructor(private readonly val: unknown) {
    super();
  }

  extract() {
    return this.val;
  }

  static generate(val: unknown) {
    return new ConstantConfig(val);
  }
}
