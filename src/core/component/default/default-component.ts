class DefaultComponent {
  public path: number[] = [];
  protected key?: string;
  private static instanceCounter: Record<string, number> = {};
  private static parentKey?: string;

  constructor(key?: string) {
    const className = this.constructor.name;
    if (!DefaultComponent.instanceCounter[className]) {
      DefaultComponent.instanceCounter[className] = 0;
    }
    DefaultComponent.instanceCounter[className]++;

    const autoKey = `${className}_${DefaultComponent.instanceCounter[className]}`;
    this.key =
      key ||
      (DefaultComponent.parentKey
        ? `${DefaultComponent.parentKey}/${autoKey}`
        : autoKey);
  }

  protected static withParentKey<T>(parentKey: string, callback: () => T): T {
    const previousParentKey = DefaultComponent.parentKey;
    DefaultComponent.parentKey = parentKey;
    const result = callback();
    DefaultComponent.parentKey = previousParentKey;
    return result;
  }
}
export default DefaultComponent;
