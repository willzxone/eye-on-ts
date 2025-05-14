import { DemoVideoGalleryQuery } from '@/common/components/gallery/__generated__/DemoVideoGalleryQuery.graphql';
import VideoPhoto from '@/common/components/gallery/VideoPhoto';
import useScreenSize from '@/common/screen/useScreenSize';
import { VideoData } from '@/demo/atoms';
import { fontSize, fontWeight, spacing } from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';
import { useMemo, useState } from 'react';
import PhotoAlbum, { Photo, RenderPhotoProps } from 'react-photo-album';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useLocation, useNavigate } from 'react-router-dom';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
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
    position: 'relative',
  },
  photoWrapper: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
    position: 'relative',
  },
  selectedPhoto: {
    borderColor: '#007BFF',
  },
  processedPhoto: {
    borderColor: '#00C853',
  },
  footerContainer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[2],
    backgroundColor: 'transparent',
    textAlign: 'center',
    boxSizing: 'border-box',
    zIndex: 10,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
  },
  processButton: {
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100%',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.base,
    padding: '8px 0',
  },
  processButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  carouselContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  carouselHeader: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  carouselClose: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  },
  carouselContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    maxWidth: '90%',
    maxHeight: '80vh',
    objectFit: 'contain',
  },
  carouselNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
  },
  carouselButton: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '24px',
  },
  carouselCounter: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#00C853',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 4,
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
    processedImages?: string[]; // Array of processed image URLs
    isProcessing?: boolean;
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
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [processedVideos, setProcessedVideos] = useState<Record<string, string[]>>({});
  
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
        processedImages: processedVideos[node.path] || undefined,
      })),
    [data.videos.edges, processedVideos]
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
  const toggleVideoSelection = (video: VideoPhotoData) => {
    if (loading) return; // Prevent changes during processing
    
    setSelectedVideos((prev) => {
      if (prev.some((v) => v.path === video.path)) {
        return prev.filter((v) => v.path !== video.path);
      }
      return [...prev, video];
    });
  };
  // 5) Process API call
  const processSelectedVideos = async () => {
    setLoading(true);
    try {
      for (const video of selectedVideos) {
        const filename = video.path.split('/').pop();
        console.log(`Processing ${filename}...`);
        
        // Mark this video as processing
        setSelectedVideos(prev => 
          prev.map(v => v.path === video.path ? {...v, isProcessing: true} : v)
        );
        
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
          console.log(filename, '→ blob size:', imageBlob.size, 'bytes');
          
          // Store the processed image
          const updatedImages = [...(processedVideos[video.path] || []), imageUrl];
          
          setProcessedVideos((prev) => {
            const existing = prev[video.path] ?? [];
            const newArr = [...existing, imageUrl];
            return {
              ...prev,
              [video.path]: newArr,
            };
          });

          // Update selectedVideos’ isProcessing & processedImages
          setSelectedVideos((prev) =>
            prev.map((v) =>
              v.path === video.path
                ? { ...v, isProcessing: false, processedImages: processedVideos[video.path]?.concat(imageUrl) }
                : v
            )
          );
          
          console.log(`Updated processed images for ${video.path}:`, updatedImages);
        } else {
          // Response is JSON
          const jsonResult = await resp.json();
          console.log(`${filename} processed:`, jsonResult);
          
          // Mark processing complete
          setSelectedVideos(prev => 
            prev.map(v => v.path === video.path ? {...v, isProcessing: false} : v)
          );
        }
      }
      alert('All selected videos processed!');
    } catch (err) {
      console.error(err);
      alert('Error processing videos');
      // Clear processing state
      setSelectedVideos(prev => 
        prev.map(v => v.isProcessing ? {...v, isProcessing: false} : v)
      );
    } finally {
      setLoading(false);
    }
  };

  // 6) Open carousel with processed images
  const openCarousel = (images: string[]) => {
    setCarouselImages(images);
    setCurrentImageIndex(0);
    setCarouselOpen(true);
  };

  // 7) Carousel navigation
  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  // 8) Custom Photo renderer
  const renderPhoto = ({
    photo: video,
    imageProps,
  }: RenderPhotoProps<VideoPhotoData>) => {
    const isSelected = selectedVideos.some((v) => v.path === video.path);
    const selectedVideo = selectedVideos.find(v => v.path === video.path);
    const hasProcessedImages = video.processedImages && video.processedImages.length > 0;
    const isProcessing = selectedVideo?.isProcessing;
    
    return (
      <div
        {...stylex.props(
          styles.photoWrapper,
          isSelected && styles.selectedPhoto,
          hasProcessedImages && styles.processedPhoto
        )}
        style={imageProps.style}
        onClick={(e) => {
          e.preventDefault();
          if (video.isUploadOption) {
            navigate('/upload', { state: { from: location } });
          } else if (hasProcessedImages) {
            // Open carousel with processed images
            openCarousel(video.processedImages!);
          } else {
            toggleVideoSelection(video);
          }
        }}
      >
        {/* Show video thumbnail */}
        <VideoPhoto
          src={video.url}
          poster={video.posterUrl}
          onClick={() => {}}
        />
        
        {/* Indicator for processed images */}
        {hasProcessedImages && (
          <div {...stylex.props(styles.imageIndicator)}>
            {video.processedImages!.length}
          </div>
        )}
        
        {/* Processing indicator */}
        {isProcessing && (
          <div {...stylex.props(styles.loadingOverlay)}>
            Processing...
          </div>
        )}
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
              {...stylex.props(
                styles.processButton,
                loading && styles.processButtonDisabled
              )}
              onClick={processSelectedVideos}
              disabled={loading}
            >
              {loading 
                ? "Processing..." 
                : `Process Selected Videos (${selectedVideos.length})`}
            </button>
          </div>
        )}
      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && (
        <div {...stylex.props(styles.carouselContainer)}>
          <div {...stylex.props(styles.carouselHeader)}>
            <button 
              {...stylex.props(styles.carouselClose)}
              onClick={() => setCarouselOpen(false)}
            >
              ×
            </button>
          </div>
          <div {...stylex.props(styles.carouselContent)}>
            <img 
              src={carouselImages[currentImageIndex]} 
              {...stylex.props(styles.carouselImage)}
              alt="Processed result"
            />
          </div>
          <div {...stylex.props(styles.carouselNavigation)}>
            <button 
              {...stylex.props(styles.carouselButton)}
              onClick={prevImage}
            >
              ‹
            </button>
            <div {...stylex.props(styles.carouselCounter)}>
              {currentImageIndex + 1} / {carouselImages.length}
            </div>
            <button 
              {...stylex.props(styles.carouselButton)}
              onClick={nextImage}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}