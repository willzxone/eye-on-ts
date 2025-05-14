import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay';
import PhotoAlbum, { Photo, RenderPhotoProps } from 'react-photo-album';
import stylex from '@stylexjs/stylex';
import { fontSize, fontWeight, spacing } from '@/theme/tokens.stylex';
import useScreenSize from '@/common/screen/useScreenSize';
import VideoPhoto from '@/common/components/gallery/VideoPhoto';
import { DemoVideoGalleryQuery } from '@/common/components/gallery/__generated__/DemoVideoGalleryQuery.graphql';
import { VideoData } from '@/demo/atoms';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',               // fill viewport
    boxSizing: 'border-box',
  },
  headerContainer: {
    padding: spacing[2],
    fontWeight: fontWeight.medium,
    fontSize: fontSize['2xl'],
    boxSizing: 'border-box',
    '@media screen and (max-width: 768px)': {
      fontSize: fontSize.xl,
    },
  },
  albumContainer: {
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: spacing[2],
    boxSizing: 'border-box',
    position: 'relative',          // so sticky footer works
  },
  photoWrapper: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  selectedPhoto: {
    borderColor: '#007BFF',
  },
  footerContainer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[2],
    backgroundColor: 'transparent',      // match your page bg
    textAlign: 'center',
    boxSizing: 'border-box',
    // borderTop: '1px solid #DDD',
  },
  processButton: {
    // padding: spacing[2],
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100%',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.base,
  },
});

type Props = {
  showUploadInGallery?: boolean;
  heading: React.ReactNode;
};

type VideoPhotoData = Photo &
  VideoData & {
    poster: string;
    isUploadOption: boolean;
  };

export default function AllVideoGallery({
  showUploadInGallery = false,
  heading,
}: Props) {
  const { isMobile: isMobileScreenSize } = useScreenSize();
  const [selectedVideos, setSelectedVideos] = useState<VideoPhotoData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 1) Fetch videos via Relay
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
              width
              height
            }
          }
        }
      }
    `,
    {}
  );

  // 2) Shape for PhotoAlbum
  const allVideos: VideoPhotoData[] = useMemo(
    () =>
      data.videos.edges.map(({ node }) => ({
        src: node.url,
        width: node.width,
        height: node.height,
        path: node.path,
        url: node.url,
        posterPath: node.posterPath,
        posterUrl: node.posterUrl,
        poster: node.posterPath ?? node.posterUrl ?? '',
        isUploadOption: false,
      })),
    [data.videos.edges]
  );

  // 3) Optionally prepend an upload tile
  const galleryVideos = useMemo(() => {
    if (!showUploadInGallery) return allVideos;
    const uploadOption: VideoPhotoData = {
      src: '',
      width: 1280,
      height: 720,
      path: '',
      url: '',
      posterPath: '',
      posterUrl: '',
      poster: '',
      isUploadOption: true,
    };
    return [uploadOption, ...allVideos];
  }, [allVideos, showUploadInGallery]);

  // 4) Toggle selection
  const toggleVideoSelection = (video: VideoPhotoData) =>
    setSelectedVideos((prev) => {
      if (prev.some((v) => v.path === video.path)) {
        return prev.filter((v) => v.path !== video.path);
      }
      return [...prev, video];
    });

  // 5) Process API call
      const processSelectedVideos = async () => {
      setLoading(true);
      try {
        for (const video of selectedVideos) {
          const filename = video.path.split('/').pop();
          console.log(`Processing ${filename}...`);
          
          const resp = await fetch(
            `http://localhost:7263/gallery/process/${filename}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: '{}',
            }
          );
          
          if (!resp.ok) throw new Error(resp.statusText);
          
          // Check content type to determine response format
          const contentType = resp.headers.get('content-type');
          
          if (contentType && contentType.includes('image/')) {
            // Response is an image - create a blob URL to display or download
            const imageBlob = await resp.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            console.log(`${filename} processed - best match image:`, imageUrl);
            
            // Here you could:
            // 1. Store the image URL in state to display in the UI
            // 2. Open in new tab: window.open(imageUrl)
            // 3. Add to the selected video object for display
            
            // Example: Add the match result to the video object
            setSelectedVideos(prev => 
              prev.map(v => v.path === video.path ? 
                {...v, matchResult: imageUrl} : v)
            );
          } else {
            // Response is JSON
            const jsonResult = await resp.json();
            console.log(`${filename} processed:`, jsonResult);
          }
        }
        alert('All selected videos processed!');
      } catch (err) {
        console.error(err);
        alert('Error processing videos');
      } finally {
        setLoading(false);
      }
    };

  // 6) Custom Photo renderer
  const renderPhoto = ({
    photo: video,
    imageProps,
  }: RenderPhotoProps<VideoPhotoData>) => {
    const isSelected = selectedVideos.some((v) => v.path === video.path);
    return (
      <div
        {...stylex.props(
          styles.photoWrapper,
          isSelected && styles.selectedPhoto
        )}
        style={imageProps.style}
        onClick={(e) => {
          e.preventDefault();
          if (video.isUploadOption) {
            navigate('/upload', { state: { from: location } });
          } else {
            toggleVideoSelection(video);
          }
        }}
      >
        <VideoPhoto
          src={video.url}
          poster={video.posterUrl}
          onClick={() => {}}
        />
      </div>
    );
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.headerContainer)}>{heading}</div>

      <div {...stylex.props(styles.albumContainer)}>
        <PhotoAlbum<VideoPhotoData>
          layout="rows"
          photos={galleryVideos}
          targetRowHeight={isMobileScreenSize ? 120 : 200}
          rowConstraints={{
            singleRowMaxHeight: isMobileScreenSize ? 120 : 240,
            maxPhotos: 3,
          }}
          spacing={4}
          renderPhoto={renderPhoto}
        />

        {selectedVideos.length > 0 && (
          <div {...stylex.props(styles.footerContainer)}>
            <button
              {...stylex.props(styles.processButton)}
              onClick={processSelectedVideos}
              disabled={loading}
            >
              Process Selected Videos ({selectedVideos.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}