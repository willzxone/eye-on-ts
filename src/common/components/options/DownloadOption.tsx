 
import {Package} from '@carbon/icons-react';
import OptionButton from './OptionButton';
import useDownloadVideo from './useDownloadVideo';

export default function DownloadOption() {
  const {download, state} = useDownloadVideo();

  return (
    <OptionButton
      title="Download"
      Icon={Package}
      loadingProps={{
        loading: state === 'started' || state === 'encoding',
        label: 'Downloading...',
      }}
      onClick={download}
    />
  );
}
