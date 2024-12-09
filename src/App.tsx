import SAM2DemoApp from '@/demo/SAM2DemoApp';
// import SettingsContextProvider from '@/settings/SettingsContextProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


export default function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: (
        // <SettingsContextProvider>
          <SAM2DemoApp />
        // </SettingsContextProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
