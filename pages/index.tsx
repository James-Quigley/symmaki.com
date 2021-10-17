import type { NextPage } from "next";
import Parser from "rss-parser";

import Layout from "../components/Layout";
import theme from "../styles/theme";

interface Props {
  stories: Story[];
}

interface MediaContent {
  $?: {
    url?: string;
    type?: string;
  };
  "media:thumbnail"?: any;
  "media:description"?: any;
}

interface Story {
  title: string;
  link: string;
  guid: string;
  categories: string[];
  pubDate: string;
  creator: string;
  media?: MediaContent;
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const parser: Parser = new Parser({
    customFields: {
      item: [["media:content", "media"]],
    },
  });

  const feed = await parser.parseURL(
    "https://www.bloomberg.com/authors/ATR8C7nQ_q4/sydney-maki.rss"
  );

  return { props: { stories: feed.items as Story[] } };
}

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <p className="text-xl text-center my-6 mx-auto max-w-prose">
          Sydney Maki is a global markets reporter and editor for Bloomberg News
          in New York, covering debt restructurings, currencies, bonds and Latin
          America.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.stories.map((story, i) => (
            <div
              className="filter rounded-lg overflow-hidden shadow-2xl"
              key={i}
            >
              <a
                className="h-full flex flex-col"
                href={story.link}
                target="_blank"
                rel="noreferrer"
              >
                <div className="">
                  {story?.media?.$?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="object-cover"
                      src={story?.media?.$?.url}
                      alt="Story thumbnail"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="object-cover"
                      src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i2oo9.m1w5KI/v2/piHJkQ_WoLj1E/-1x-1.png"
                      alt="Thumbnail placeholder"
                      style={{
                        filter: "blur(2px)",
                      }}
                    />
                  )}
                </div>

                <h6 className="text-lg md:text-xl lg:text-2xl p-4 flex-auto">
                  {story.title}
                </h6>
                <p className="text-sm text-gray-400 self-end justify-self-end p-4 m-0">
                  {new Date(story.pubDate).toLocaleString()}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
