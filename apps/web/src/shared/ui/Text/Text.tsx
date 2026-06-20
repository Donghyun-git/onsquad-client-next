import { ReactNode } from 'react';

import cn from 'classnames';

type TextPropsType = {
  children: ReactNode | ReactNode[];
  className?: string;
};

const Text = () => {
  const TextComponent = ({ children, className }: TextPropsType, size: string) => {
    return <div className={cn(`${size} ${className}`)}>{children}</div>;
  };

  const xxs = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-[0.65rem]');
  };

  const xs = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-xs');
  };

  const sm = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-sm');
  };

  const base = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-base');
  };

  const lg = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-lg');
  };

  const xl = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-xl');
  };

  const xxl = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-2xl');
  };

  const xxxl = ({ children, className }: TextPropsType) => {
    return TextComponent({ children, className }, 'text-3xl');
  };

  return {
    xxs,
    xs,
    sm,
    base,
    lg,
    xl,
    xxl,
    xxxl,
  };
};

export default Text();
