import { div, h1 } from "./base-tag";
import Component from "./component";

class Test extends Component {
  protected counter: number = 0;
  protected build(): Component {
    this.set(() => this.counter++);
    return div(h1("prova"));
  }
}

function run(page: Component) {}

export default run;
