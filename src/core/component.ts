class Component {
  public tag: Tag;
  public id: string;
  public path: string[];
  public children: (Component | any)[];
  public htmlElement: HTMLElement;
  public props: IntrinsicAttributes<Tag>;
  constructor(
    tag: Tag,
    props: IntrinsicAttributes<Tag>,
    ...children: Component[]
  ) {
    this.htmlElement = document.createElement(tag);
    this.tag = tag;
    this.id = "random string";
    this.path = [];
    this.children = children;
    this.props = props;
    this.props = {};
  }
  private generatePathForChildren() {
    function dfs(current: Component) {
      for (let i = 0; i < current.children.length; i++) {
        if (!(current.children[i] instanceof Component)) continue;
        current.children[i].path = [...current.path, i.toString()];
        dfs(current.children[i]);
      }
    }
    dfs(this);
  }
  private addAttribute() {}
  private addChild() {}
  private rerender() {}
  private syncWithDOM() {
    function dfs(current: Component) {
      for (const child of current.children) {
        current.htmlElement.appendChild(child.htmlElement);
        dfs(child);
      }
    }
    dfs(this);
  }
  protected set(callback: () => void) {
    callback();
    this.build();
  }
  protected build(): Component {
    throw new Error("Missing build method");
  }
}

export default Component;
