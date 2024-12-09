 
import LoadingStateScreen from '@/common/loading/LoadingStateScreen';
// import useSettingsContext from '@/settings/useSettingsContext';
// import {Cog6ToothIcon} from '@heroicons/react/24/outline';
import stylex from '@stylexjs/stylex';
import {Suspense} from 'react';
// import {Button, Indicator} from 'react-daisyui';
import {Outlet} from 'react-router-dom';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100vh',
    backgroundColor: '#000',
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
    overflowY: {
      default: 'auto',
      '@media screen and (max-width: 768px)': 'auto',
    },
  },
  debugActions: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 100,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});

export default function RootLayout() {
  // const {openModal, hasChanged} = useSettingsContext();

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.content)}>
        <Suspense
          fallback={
            <LoadingStateScreen
              title="Loading demo..."
              description="This may take a few moments, you're almost there!"
            />
          }>
          <Outlet />
        </Suspense>
      </div>
      {/* <div {...stylex.props(styles.debugActions)}>
        <Indicator>
          {hasChanged && (
            <Indicator.Item
              className="badge badge-primary scale-50"
              horizontal="start"
              vertical="top"
            />
          )}
          <Button
            color="ghost"
            onClick={openModal}
            shape="circle"
            size="xs"
            startIcon={<Cog6ToothIcon className="w-4 h-4" />}
            title="Bugnub"
          />
        </Indicator>
      </div> */}
    </div>
  );
}
