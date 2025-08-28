import type { IconTypes } from "../../types/icon-types";
import React, { type JSX, memo } from "react";


type IconProps = {
  icon: IconTypes;
} & React.SVGProps<SVGElement>;

const icons: Record<IconTypes, JSX.Element> = {
  transactions_nav: <div></div>,
};

export const Icon = memo((props: IconProps) => {
  const { icon, ...otherProps } = props;

  return React.cloneElement(icons[icon], otherProps);
});
