 
import MobileObjectsToolbarHeader from '@/common/components/annotations/MobileObjectsToolbarHeader';
import ObjectsToolbarBottomActions from '@/common/components/annotations/ObjectsToolbarBottomActions';
import {getObjectLabel} from '@/common/components/annotations/ObjectUtils';
import ToolbarObject from '@/common/components/annotations/ToolbarObject';
import MobileFirstClickBanner from '@/common/components/MobileFirstClickBanner';
import {activeTrackletObjectAtom, isFirstClickMadeAtom} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function MobileObjectsToolbar({onTabChange}: Props) {
  const activeTracklet = useAtomValue(activeTrackletObjectAtom);
  const isFirstClickMade = useAtomValue(isFirstClickMadeAtom);

  if (!isFirstClickMade) {
    return <MobileFirstClickBanner />;
  }

  return (
    <div className="w-full">
      <MobileObjectsToolbarHeader />
      {activeTracklet != null && (
        <ToolbarObject
          label={getObjectLabel(activeTracklet)}
          tracklet={activeTracklet}
          isActive={true}
          isMobile={true}
        />
      )}

      <ObjectsToolbarBottomActions onTabChange={onTabChange} />
    </div>
  );
}
