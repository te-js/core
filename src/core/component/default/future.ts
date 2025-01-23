// import { Component } from "../component";

// interface FutureProps<T> {
//   promise: Promise<T>;
//   builder: (value: T) => Component;
//   error: (error: Error) => Component;
//   loading: () => Component;
// }

// class Future<T extends Promise<T>> extends Component {
//   private loading = this.state(false);
//   constructor(private props: FutureProps<T>) {
//     super();
//   }
//   init() {}
//   build() {
//     return this.props.promise.then(this.props.builder).catch(this.props.error);
//   }
// }
