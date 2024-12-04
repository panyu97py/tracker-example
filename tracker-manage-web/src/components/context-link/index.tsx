import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { noop } from '@/utils';
import './index.css';

type AnyFn = (...args: any[]) => any;

type Functions<T> = {
  [K in keyof T]: NonNullable<T[K]> extends AnyFn ? K : never;
};
type FunctionKeys<T> = Functions<T>[keyof T];

export interface ContextLinkProps<T> extends ButtonProps {
  effectParams?: any;
  effectName: FunctionKeys<T>;
  children?: React.ReactNode;
  content?: string;
}

export interface FieldLinkProps<T> extends Omit<ContextLinkProps<T>, 'children'> {
  value?: string;
}

export const generateContextLink = <T extends Record<string, any>>(Context: React.Context<T>) => {
  const Link: React.FC<ContextLinkProps<T>> = (props) => {
    const { effectName, effectParams, type, content, children, className, ...otherProps } = props;

    const { [effectName]: effect = noop } = useContext(Context);

    const handleClick = () => (effect as AnyFn)(effectParams);

    return (
      <Button
        {...otherProps}
        type={type || 'link'}
        onClick={handleClick}
        style={{ padding: 0 }}
        className={classNames(className, 'allow-select-button')}
      >
        {content || children}
      </Button>
    );
  };

  const FieldLink: React.FC<FieldLinkProps<T>> = (props) => {
    const { value, ...otherProps } = props;

    return <Link {...otherProps}>{value}</Link>;
  };

  return { Link, FieldLink };
};
