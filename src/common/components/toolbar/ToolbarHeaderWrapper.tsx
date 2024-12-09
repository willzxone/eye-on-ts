 
import {ReactNode} from 'react';
import ToolbarProgressChip from './ToolbarProgressChip';

type Props = {
  title: string;
  description?: string;
  bottomSection?: ReactNode;
  showProgressChip?: boolean;
  className?: string;
};

export default function ToolbarHeaderWrapper({
  title,
  description,
  bottomSection,
  showProgressChip = true,
  className,
}: Props) {
  return (
    <div
      className={`flex flex-col gap-2 p-8 border-b border-b-black ${className}`}>
      <div className="flex items-center">
        {showProgressChip && <ToolbarProgressChip />}
        <h2 className="text-xl">{title}</h2>
      </div>

      {description != null && (
        <div className="flex-1 text-gray-400">{description}</div>
      )}
      {bottomSection != null && bottomSection}
    </div>
  );
}
