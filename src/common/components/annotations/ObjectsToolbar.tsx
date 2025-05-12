 
import AddObjectButton from '@/common/components/annotations/AddObjectButton';
import FirstClickView from '@/common/components/annotations/FirstClickView';
// import LimitNotice from '@/common/components/annotations/LimitNotice';
import ObjectsToolbarBottomActions from '@/common/components/annotations/ObjectsToolbarBottomActions';
import ObjectsToolbarHeader from '@/common/components/annotations/ObjectsToolbarHeader';
import {getObjectLabel} from '@/common/components/annotations/ObjectUtils';
import ToolbarObject from '@/common/components/annotations/ToolbarObject';
import {
  activeTrackletObjectAtom,
  activeTrackletObjectIdAtom,
  isAddObjectEnabledAtom,
  isFirstClickMadeAtom,
  // isTrackletObjectLimitReachedAtom,
  trackletObjectsAtom,
} from '@/demo/atoms';
import {useAtomValue, useSetAtom} from 'jotai';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function ObjectsToolbar({onTabChange}: Props) {
  const tracklets = useAtomValue(trackletObjectsAtom);
  const activeTracklet = useAtomValue(activeTrackletObjectAtom);
  const setActiveTrackletId = useSetAtom(activeTrackletObjectIdAtom);
  const isFirstClickMade = useAtomValue(isFirstClickMadeAtom);
  // const isObjectLimitReached = useAtomValue(isTrackletObjectLimitReachedAtom);
  const isAddObjectEnabled = useAtomValue(isAddObjectEnabledAtom);

  if (!isFirstClickMade) {
    return <FirstClickView />;
  }

  return (
    <div className="flex flex-col h-full">
      <ObjectsToolbarHeader />
      <div className="grow w-full overflow-y-auto">
        {tracklets.map(tracklet => {
          return (
            <ToolbarObject
              key={tracklet.id}
              label={getObjectLabel(tracklet)}
              tracklet={tracklet}
              isActive={activeTracklet?.id === tracklet.id}
              onClick={() => {
                setActiveTrackletId(tracklet.id);
              }}
            />
          );
        })}
        {isAddObjectEnabled && <AddObjectButton />}
        {/* {isObjectLimitReached && <LimitNotice />} */}
      </div>
      <ObjectsToolbarBottomActions onTabChange={onTabChange} />
    </div>
  );
}
