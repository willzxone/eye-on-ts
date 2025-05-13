 
import '@/assets/scss/App.scss';
import ErrorReport from '@/common/error/ErrorReport';
import DemoErrorFallback from '@/demo/DemoErrorFallback';
import DemoSuspenseFallback from '@/demo/DemoSuspenseFallback';
import RelayEnvironmentProvider from '@/graphql/RelayEnvironmentProvider';
import RootLayout from '@/layouts/RootLayout';
import SAM2DemoPage from '@/routes/DemoPageWrapper';
import PageNotFoundPage from '@/routes/PageNotFoundPage';
import PublicRoute from '@/routes/publicRoute';
import useSettingsContext from '@/settings/useSettingsContext';
import {Route, Routes} from 'react-router-dom';
import Auth from "@/auth/auth";
import ResetPassword from '@/auth/resetPassword';
import ProtectedRoute from '@/routes/protectedRoute';
import ProcessVideo from './processVideo';

export default function DemoAppWrapper() {
  const {settings} = useSettingsContext();
  return (
    <RelayEnvironmentProvider
      endpoint={settings.videoAPIEndpoint}
      suspenseFallback={<DemoSuspenseFallback />}
      errorFallback={DemoErrorFallback}>
      <DemoApp />
    </RelayEnvironmentProvider>
  );
}

function DemoApp() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<PublicRoute />} >
            <Route index={true} element={<Auth />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={"home"} element={<SAM2DemoPage />} />
            <Route path={"process-video"} element={<ProcessVideo />} />
          </Route>
          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
      <ErrorReport />
    </>
  );
}
