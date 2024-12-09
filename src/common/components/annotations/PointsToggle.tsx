 
import {labelTypeAtom} from '@/demo/atoms';
import {AddFilled, SubtractFilled} from '@carbon/icons-react';
import {useAtom} from 'jotai';

export default function PointsToggle() {
  const [labelType, setLabelType] = useAtom(labelTypeAtom);
  const isPositive = labelType === 'positive';

  const buttonStyle = (selected: boolean) =>
    `btn-md bg-graydark-800 !text-white md:px-2 lg:px-4 py-0.5 ${selected ? `border border-white hover:bg-graydark-800` : `border-graydark-700 hover:bg-graydark-700`}`;

  return (
    <div className="flex items-center w-full md:ml-2">
      <div className="join group grow gap-[1px]">
        <button
          className={`w-1/2  btn join-item text-white ${buttonStyle(isPositive)}`}
          onClick={() => setLabelType('positive')}>
          <AddFilled size={24} className="text-blue-500" /> Add
        </button>
        <button
          className={`w-1/2 btn join-item text-red-700 ${buttonStyle(!isPositive)}`}
          onClick={() => setLabelType('negative')}>
          <SubtractFilled size={24} className="text-red-400" />
          Remove
        </button>
      </div>
    </div>
  );
}
