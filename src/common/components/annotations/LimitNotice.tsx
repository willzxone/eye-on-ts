 
import {InformationFilled} from '@carbon/icons-react';

export default function LimitNotice() {
  return (
    <div className="mt-6 gap-3 mx-6 flex items-center text-gray-400">
      <div>
        <InformationFilled size={32} />
      </div>
      <div className="text-sm leading-snug">
        In this demo, you can track up to 3 objects, even though the SAM 2 model
        does not have a limit.
      </div>
    </div>
  );
}
