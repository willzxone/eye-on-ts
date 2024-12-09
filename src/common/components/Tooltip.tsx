 
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
  className?: string;
  message: string;
  position?: 'left' | 'top' | 'right' | 'bottom';
}>;

/**
 * This is a custom Tooltip component because React Daisy UI does not have an
 * option to *only* show tooltip on large devices.
 */
export default function Tooltip({
  children,
  className = '',
  message,
  position = 'top',
}: Props) {
  return (
    <div
      className={`lg:tooltip tooltip-${position} ${className}`}
      data-tip={message}>
      {children}
    </div>
  );
}
