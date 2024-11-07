import { span } from "../base-tag";
import { Stateful } from "../stateful";
import { Component } from "../stateless";

export function map<T>(
  list: T[],
  fn: (item: T, index?: number) => Component<Tag> | Stateful
) {
  return span(...list.map((item, index) => fn(item, index)));
}
