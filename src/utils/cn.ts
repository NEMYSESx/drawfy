/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const cn = (classes: any, conditions: any) => {
  const conditionalClasses = classNames(conditions);

  return twMerge(...[...classes, conditionalClasses].filter(Boolean));
};

export default cn;
