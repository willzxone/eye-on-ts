 
import {DemoVideoGalleryQuery} from '@/common/components/gallery/__generated__/DemoVideoGalleryQuery.graphql';
// import VideoGalleryUploadVideo from '@/common/components/gallery/VideoGalleryUploadPhoto';
import VideoPhoto from '@/common/components/gallery/VideoPhoto';
import useScreenSize from '@/common/screen/useScreenSize';
import {VideoData} from '@/demo/atoms';
import {fontSize, fontWeight, spacing} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';
import {useMemo} from 'react';
import PhotoAlbum, {Photo, RenderPhotoProps} from 'react-photo-album';
import {graphql, useLazyLoadQuery} from 'react-relay';
// import {useLocation, useNavigate} from 'react-router-dom';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: spacing[1],
    height: '100%',
    lineHeight: 1.2,
    paddingTop: spacing[8],
  },
  headerContainer: {
    marginBottom: spacing[8],
    fontWeight: fontWeight['medium'],
    fontSize: fontSize['2xl'],
    '@media screen and (max-width: 768px)': {
      marginTop: spacing[0],
      marginBottom: spacing[8],
      marginHorizontal: spacing[4],
      fontSize: fontSize['xl'],
    },
  },
  albumContainer: {
    flex: '1 1 0%',
    width: '100%',
    overflowY: 'auto',
  },
});

type Props = {
  showUploadInGallery?: boolean;
  onSelect?: (video: VideoPhotoData) => void;
  onUpload: (video: VideoData) => void;
  onUploadStart?: () => void;
  onUploadError?: (error: Error) => void;
  heading: any;
};

type VideoPhotoData = Photo &
  VideoData & {
    poster: string;
    isUploadOption: boolean;
  };

export default function AllVideoGallery({
  showUploadInGallery = false,
//   onSelect,
//   onUpload,
//   onUploadStart,
//   onUploadError,
  heading,
}: Props) {
  const {isMobile: isMobileScreenSize} = useScreenSize();

  const data = useLazyLoadQuery<DemoVideoGalleryQuery>(
    graphql`
      query DemoVideoGalleryQuery {
        videos {
          edges {
            node {
              id
              path
              posterPath
              url
              posterUrl
              height
              width
              posterUrl
            }
          }
        }
      }
    `,
    {},
  );

  const allVideos: VideoPhotoData[] = useMemo(() => {
    return data.videos.edges.map(video => {
      return {
        src: video.node.url,
        path: video.node.path,
        poster: video.node.posterPath,
        posterPath: video.node.posterPath,
        url: video.node.url,
        posterUrl: video.node.posterUrl,
        width: video.node.width,
        height: video.node.height,
        isUploadOption: false,
      } as VideoPhotoData;
    });
  }, [data.videos.edges]);

  const shareableVideos: VideoPhotoData[] = useMemo(() => {
    const filteredVideos = [...allVideos];

    if (showUploadInGallery) {
      const uploadOption = {
        src: '',
        width: 1280,
        height: 720,
        poster: '',
        isUploadOption: true,
      } as VideoPhotoData;
      filteredVideos.unshift(uploadOption);
    }

    return filteredVideos;
  }, [allVideos, showUploadInGallery]);

  const renderPhoto = ({
    photo: video,
    imageProps,
  }: RenderPhotoProps<VideoPhotoData>) => {
    const {style} = imageProps;
    const {url, posterUrl} = video;

    return (
      <VideoPhoto
      src={url}
      poster={posterUrl}
      style={style}
      onClick={async () => {
        try {
          const filename = video.path.split("/").pop();                // "01_dog.mp4"
           const response = await fetch(`http://localhost:7263/gallery/process/${filename}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to process video: ${response.statusText}`);
          }

          const result = await response.json();
          console.log('Processing result:', result);
        } catch (error) {
          console.error('Error processing video:', error);
        }
      }}
    />
    );
  };

//   function handleUploadVideo(video: VideoData) {
//     navigate(location.pathname, {
//       state: {
//         video,
//       },
//     });
//     onUpload?.(video);
//   }
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.albumContainer)}>
        <div className="pt-0 md:px-16 md:pt-8 md:pb-8">
          <div {...stylex.props(styles.headerContainer)}>
            {heading}
          </div>

          <PhotoAlbum<VideoPhotoData>
            layout="rows"
            photos={shareableVideos}
            targetRowHeight={isMobileScreenSize ? 120 : 200}
            rowConstraints={{
              singleRowMaxHeight: isMobileScreenSize ? 120 : 240,
              maxPhotos: 3,
            }}
            renderPhoto={renderPhoto}
            spacing={4}
          />
        </div>
      </div>
    </div>
  );
}
