import { Component, TNode } from "./core";

export * from "./core/component/base-component";
export * from "./core/component/base-tag";
export * from "./core/component/component";
export * from "./core/route";
export * from "./core/store";

export type TElement = Component | TNode<Tag>;
export type TExtendedElement = Component | TNode<Tag> | BaseTypes;
