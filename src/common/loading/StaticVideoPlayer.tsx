 
import React from 'react';

export type VideoAspectRatio = 'wide' | 'square' | 'normal' | 'fill';

export type VideoProps = {
  src: string;
  aspectRatio?: VideoAspectRatio;
  className?: string;
  containerClassName?: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export default function StaticVideoPlayer({
  src,
  aspectRatio,
  className = '',
  containerClassName = '',
  ...props
}: VideoProps) {
  let aspect =
    aspectRatio === 'wide'
      ? `aspect-video`
      : aspectRatio === 'square'
        ? 'aspect-square'
        : 'aspect-auto';

  let videoSize = '';

  if (aspectRatio === 'fill') {
    aspect =
      'absolute object-cover right-0 bottom-0 min-w-full min-h-full h-full';
    videoSize = 'w-full h-full object-cover object-center';
  }

  return (
    <div
      className={`w-full relative flex flex-col ${aspect} ${containerClassName}`}>
      <video className={`m-0 ${videoSize} ${className}`} {...props}>
        <source src={src} type="video/mp4" />
        Sorry, your browser does not support embedded videos.
      </video>
    </div>
  );
}
