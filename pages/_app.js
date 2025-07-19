import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import { getEntriesByContentType } from "../lib/helpers";

function MyApp({ Component, pageProps, globalNavigation }) {
  return (
    <MainLayout globalNavigation={globalNavigation}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Fetch global navigation
  const globalNavEntries = await getEntriesByContentType("globalNavigation");
  const globalNavigation = globalNavEntries?.items?.[0] || null;

  return {
    globalNavigation,
  };
};

export default MyApp;
