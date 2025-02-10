import { TElement } from "../../..";
import { Component } from "../component";

interface ResolverProps<T> {
  builder: (value: T) => TElement;
  error?: (error: Error) => TElement;
  loading?: () => TElement;
}

interface IState<T> {
  error: Error | null;
  loading: boolean;
  data: T | null;
}

class Resolver<T> extends Component {
  protected currentState = this.state<IState<T>>({
    error: null,
    loading: false,
    data: null,
  });

  constructor(
    key: string,
    protected promise: Promise<T>,
    protected props: ResolverProps<T>
  ) {
    super(key);
    this.init(() => this.initialize());
  }

  private initialize() {
    this.currentState.loading = true;
    this.promise
      .then((res) => (this.currentState.data = res))
      .catch((err) => (this.currentState.error = err))
      .finally(() => (this.currentState.loading = false));
  }

  build() {
    if (this.currentState.loading && this.props.loading) {
      return this.props.loading();
    }
    if (this.currentState.error && this.props.error) {
      return this.props.error(this.currentState.error);
    }
    return this.props.builder(this.currentState.data!);
  }
}

export { Resolver as Resolver };
