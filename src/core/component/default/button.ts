import { button, TElement, TNode } from "../../..";

const buttonVariants = {
  default: "",
  outline: "border border-black",
  solid: "bg-black text-white",
} as const;

const buttonSizes = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3",
} as const;

type NewType = {
  variant?: keyof typeof buttonVariants;
};

type ButtonProps = TNode<"button">["props"] & NewType;

export default function Button(
  { variant = "default", ...props }: ButtonProps,
  ...children: TElement[]
): TElement {
  return button({
    ...props,
    class: `${props?.class} ${buttonVariants[variant]}`,
    ...children,
  });
}
