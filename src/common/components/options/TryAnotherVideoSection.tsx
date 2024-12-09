 
import GalleryOption from '@/common/components/options/GalleryOption';
import UploadOption from '@/common/components/options/UploadOption';
import {OBJECT_TOOLBAR_INDEX} from '@/common/components/toolbar/ToolbarConfig';
import useVideo from '@/common/components/video/editor/useVideo';
import useScreenSize from '@/common/screen/useScreenSize';

type Props = {
  onTabChange: (tabIndex: number) => void;
};

export default function TryAnotherVideoSection({onTabChange}: Props) {
  const {isMobile} = useScreenSize();
  const video = useVideo();

  function handleVideoChange() {
    if (video != null) {
      video.pause();
      video.frame = 0;
    }
    onTabChange(OBJECT_TOOLBAR_INDEX);
  }

  if (isMobile) {
    return (
      <div className="px-8 pb-8">
        <div className="font-medium text-gray-300 text-sm">
          Or, try another video
        </div>
        <div className="flex flex-row gap-4 mt-4 w-full">
          <div className="flex-1">
            <UploadOption onUpload={handleVideoChange} />
          </div>
          <div className="flex-1">
            <GalleryOption onChangeVideo={handleVideoChange} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-8">
      <div className="font-medium text-gray-300 text-base">
        Try another video
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <UploadOption onUpload={handleVideoChange} />
        <GalleryOption onChangeVideo={handleVideoChange} />
      </div>
    </div>
  );
}
