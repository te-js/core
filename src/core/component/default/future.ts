import { TNode } from "../base-component";
import { Component } from "../component";

interface FutureProps<T> {
  builder: (value: T) => TNode<keyof HTMLElementTagNameMap>;
  error: (error: Error) => TNode<keyof HTMLElementTagNameMap>;
  loading: () => TNode<keyof HTMLElementTagNameMap>;
}

class Future<T extends Promise<T>> extends Component {
  private loading = this.state(false);
  private error = this.state<{ error: Error | null }>({ error: null });
  private data = this.state<{ data: T | null }>({ data: null });
  constructor(private promise: Promise<T>, private props: FutureProps<T>) {
    super();
    this.loading.value = true;
    this.promise
      .then((res) => (this.data.data = res))
      .catch((error) => (this.error.error = error))
      .finally(() => (this.loading.value = false));
  }
  build() {
    if (this.loading.value) {
      return this.props.loading();
    }
    if (this.error.error) {
      return this.props.error(this.error.error);
    }
    return this.props.builder(this.data.data!);
  }
}

export { Future };
