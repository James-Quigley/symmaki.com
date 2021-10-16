import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title?: string;
  children: any;
}

const Layout = (
  props: Props = {
    title: "Sydney Maki",
    children: null,
  }
) => {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Sydney Maki's personal website" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <nav className="w-full bg-yellow-300 p-2 align-middle relative">
        <span className="text-bold text-2xl mx-8 inline">Sydney Maki</span>
        <ul className="inline absolute right-5">
          <li className="inline mx-3">
            <a
              className="inline"
              href="https://twitter.com/symmaki"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/../public/twitter.svg"
                alt="Twitter Logo"
                width="25px"
                height="25px"
              />
            </a>
          </li>
          <li className="inline mx-3">
            <a
              className="inline"
              href="https://www.linkedin.com/in/sydneymaki/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/../public/linkedin.svg"
                alt="LinkedIn Logo"
                width="25px"
                height="25px"
              />
            </a>
          </li>
        </ul>
      </nav>

      <main className="">{props.children}</main>

      <footer className="mt-8 text-gray-500 text-sm text-right pr-10 pb-5">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
