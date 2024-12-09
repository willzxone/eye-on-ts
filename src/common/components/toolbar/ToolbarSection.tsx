 
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
  title: string;
  borderBottom?: boolean;
}>;

export default function ToolbarSection({
  children,
  title,
  borderBottom = false,
}: Props) {
  return (
    <div className={`p-6 ${borderBottom && 'border-b border-black'}`}>
      <div className="font-bold ml-2">{title}</div>
      <div className="grid grid-cols-4 gap-2 mt-2 md:mt-6">{children}</div>
    </div>
  );
}
