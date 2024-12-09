 
import Toolbar from '@/common/components/toolbar/Toolbar';
import DemoVideoEditor from '@/common/components/video/editor/DemoVideoEditor';
import useInputVideo from '@/common/components/video/useInputVideo';
import StatsView from '@/debug/stats/StatsView';
import {VideoData} from '@/demo/atoms';
import DemoPageLayout from '@/layouts/DemoPageLayout';
import {DemoPageQuery} from '@/routes/__generated__/DemoPageQuery.graphql';
import {useEffect, useMemo} from 'react';
import {graphql, useLazyLoadQuery} from 'react-relay';
import {Location, useLocation} from 'react-router-dom';

type LocationState = {
  video?: VideoData;
};

export default function DemoPage() {
  const {state} = useLocation() as Location<LocationState>;
  const data = useLazyLoadQuery<DemoPageQuery>(
    graphql`
      query DemoPageQuery {
        defaultVideo {
          path
          posterPath
          url
          posterUrl
          height
          width
        }
      }
    `,
    {},
  );
  const {setInputVideo} = useInputVideo();

  const video = useMemo(() => {
    return state?.video ?? data.defaultVideo;
  }, [state, data]);

  useEffect(() => {
    setInputVideo(video);
  }, [video, setInputVideo]);

  return (
    <DemoPageLayout>
      <StatsView />
      <Toolbar />
      <DemoVideoEditor video={video} />
    </DemoPageLayout>
  );
}
