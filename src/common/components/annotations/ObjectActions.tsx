 
import PointsToggle from '@/common/components/annotations/PointsToggle';
import useVideo from '@/common/components/video/editor/useVideo';
import useReportError from '@/common/error/useReportError';
import {
  activeTrackletObjectIdAtom,
  isPlayingAtom,
  isStreamingAtom,
} from '@/demo/atoms';
import {
  AddFilled,
  Select_02,
  SubtractFilled,
  TrashCan,
} from '@carbon/icons-react';
import {useAtom, useAtomValue} from 'jotai';
import {useState} from 'react';
import type {ButtonProps} from 'react-daisyui';
import {Button} from 'react-daisyui';

type Props = {
  objectId: number;
  active: boolean;
};

function CustomButton({className, ...props}: ButtonProps) {
  return (
    <Button
      size="sm"
      color="ghost"
      className={`font-medium border-none hover:bg-black  px-2 h-10 ${className}`}
      {...props}>
      {props.children}
    </Button>
  );
}

export default function ObjectActions({objectId, active}: Props) {
  const [isRemovingObject, setIsRemovingObject] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackletId] = useAtom(
    activeTrackletObjectIdAtom,
  );
  const isStreaming = useAtomValue(isStreamingAtom);
  const isPlaying = useAtom(isPlayingAtom);

  const video = useVideo();
  const reportError = useReportError();

  async function handleRemoveObject(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    try {
      event.stopPropagation();
      setIsRemovingObject(true);
      if (isStreaming) {
        await video?.abortStreamMasks();
      }
      if (isPlaying) {
        video?.pause();
      }
      await video?.deleteTracklet(objectId);
    } catch (error) {
      reportError(error);
    } finally {
      setIsRemovingObject(false);
      if (activeTrackId === objectId) {
        setActiveTrackletId(null);
      }
    }
  }

  return (
    <div>
      {active && (
        <div className="text-sm mt-1 leading-snug text-gray-400 hidden md:block ml-2 md:mb-4">
          Select <AddFilled size={14} className="inline" /> to add areas to the
          object and <SubtractFilled size={14} className="inline" /> to remove
          areas from the object in the video. Click on an existing point to
          delete it.
        </div>
      )}

      <div className="flex justify-between items-center md:mt-2 mt-0">
        {active ? (
          <PointsToggle />
        ) : (
          <>
            <CustomButton startIcon={<Select_02 size={24} />}>
              Edit selection
            </CustomButton>
            <CustomButton
              loading={isRemovingObject}
              onClick={handleRemoveObject}
              startIcon={!isRemovingObject && <TrashCan size={24} />}>
              <span className="hidden md:inline">Clear</span>
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
}
