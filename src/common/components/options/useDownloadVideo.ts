 
import {getFileName} from '@/common/components/options/ShareUtils';
import {
  EncodingCompletedEvent,
  EncodingStateUpdateEvent,
} from '@/common/components/video/VideoWorkerBridge';
import useVideo from '@/common/components/video/editor/useVideo';
import {MP4ArrayBuffer} from 'mp4box';
import {useState} from 'react';

type DownloadingState = 'default' | 'started' | 'encoding' | 'completed';

type State = {
  state: DownloadingState;
  progress: number;
  download: (shouldSave?: boolean) => Promise<MP4ArrayBuffer>;
};

export default function useDownloadVideo(): State {
  const [downloadingState, setDownloadingState] =
    useState<DownloadingState>('default');
  const [progress, setProgress] = useState<number>(0);

  const video = useVideo();

  async function download(shouldSave = true): Promise<MP4ArrayBuffer> {
    return new Promise(resolve => {
      function onEncodingStateUpdate(event: EncodingStateUpdateEvent) {
        setDownloadingState('encoding');
        setProgress(event.progress);
      }

      function onEncodingComplete(event: EncodingCompletedEvent) {
        const file = event.file;

        if (shouldSave) {
          saveVideo(file, getFileName());
        }

        video?.removeEventListener('encodingCompleted', onEncodingComplete);
        video?.removeEventListener(
          'encodingStateUpdate',
          onEncodingStateUpdate,
        );
        setDownloadingState('completed');
        resolve(file);
      }

      video?.addEventListener('encodingStateUpdate', onEncodingStateUpdate);
      video?.addEventListener('encodingCompleted', onEncodingComplete);

      if (downloadingState === 'default' || downloadingState === 'completed') {
        setDownloadingState('started');
        video?.pause();
        video?.encode();
      }
    });
  }

  function saveVideo(file: MP4ArrayBuffer, fileName: string) {
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.setAttribute('target', '_self');
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return {download, progress, state: downloadingState};
}
