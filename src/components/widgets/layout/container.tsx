import classNames from 'classnames';
import React from 'react';
import { container } from './styles.css';

// Centres page content at the desktop content width
export default function Container({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames(container, className)} {...rest}>
      {children}
    </div>
  );
}
