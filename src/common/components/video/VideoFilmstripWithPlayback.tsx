 
import PlaybackButton from '@/common/components/button/PlaybackButton';
import VideoFilmstrip from '@/common/components/video/filmstrip/VideoFilmstrip';
import {spacing, w} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'end',
    gap: spacing[4],
    paddingHorizontal: spacing[4],
    width: '100%',
  },
  playbackButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: w[12],
    height: w[12],
  },
  filmstripContainer: {
    flexGrow: 1,
  },
});

export default function VideoFilmstripWithPlayback() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.playbackButtonContainer)}>
        <PlaybackButton />
      </div>
      <div {...stylex.props(styles.filmstripContainer)}>
        <VideoFilmstrip />
      </div>
    </div>
  );
}
