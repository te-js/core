class DefaultComponent {
  public path: number[] = [];

  constructor(protected key?: string | undefined) {
    this.key = key || Math.random().toString(36).substring(7);
  }
}
export default DefaultComponent;
