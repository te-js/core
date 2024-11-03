type Tag = keyof HTMLElementTagNameMap;
type Attributes<T extends Tag> = Map<
  keyof ElementTagNameMap[T],
  ElementTagNameMap[T]
>;

// declare module globalThis {
//   interface HTMLElement {
//     tag: Tag;
//     path: string[];
//   }
// }
