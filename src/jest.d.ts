declare module jest {
  interface Matchers<R, T = {}> {
    toBeValidConfig(): void;
  }
}
