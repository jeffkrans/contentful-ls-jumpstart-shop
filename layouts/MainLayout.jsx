import Head from "next/head";
import Link from "next/link";
import _ from "lodash";
import NavComponent from "../components/NavComponent";

const MainLayout = (props) => {
  const globalNavigation = props.globalNavigation || null;

  // Debug logging to see the structure
  console.log("Global Navigation:", globalNavigation);

  return (
    <>
      <Head>
        <title>Jumpstart Shop</title>
      </Head>

      <div className="mt-4 p-2 bg-blau text-white flex items-center gap-4">
        <NavComponent globalNavigation={globalNavigation} />
      </div>

      <main>
        <div className="h-screenx py-20 px-60"> {props.children}</div>
      </main>
      <div className="mt-4 p-2 bg-blau text-white">
        <a
          href="https://training.contentful.com"
          target="_blank"
          rel="noreferrer"
        >
          Contentful Learning Services
        </a>
      </div>
    </>
  );
};

export default MainLayout;
