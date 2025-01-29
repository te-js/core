import DefaultComponent from "./default/default-component";

class ServerComponent extends DefaultComponent {
  public async build() {
    return this;
  }
}

export default ServerComponent;
