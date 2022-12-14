import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { FiClock } from "react-icons/fi";
import { ArrowLink } from "src/components/arrow-link";
import { TOC } from "src/components/toc";
import { TopicTag } from "src/components/topic-tag";
import { formatTime } from "src/utils/datetime";
import { parseMd, type Heading } from "src/utils/markdown";
import { getAllSlugs, getPostBySlug, type IPost } from "src/utils/post";

type IProps = Omit<IPost, "content"> & {
  toc: Heading[];
  html: string;
};

const Page = ({
  createdAt,
  title,
  description,
  topic,
  readingTime,
  toc,
  html,
}: IProps) => (
  <>
    <Head>
      <title>{title + " - MrCai"}</title>
    </Head>
    <main className="w-full">
      <section className="flex flex-col items-center gap-y-6 sm:gap-y-8 lg:gap-y-10 px-8 py-12 sm:py-20 bg-dim shadow-inner">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-center">
          {title}
        </h1>
        <p className="text-base text-dim text-center">{description}</p>
        <p className="flex items-center gap-x-2 text-dim">
          <FiClock />
          {readingTime}
        </p>
      </section>
      <TOC toc={toc} />
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          className="grow max-w-none py-4 article"
        />
        <hr className="border-slate-300 dark:border-slate-700" />
        <div className="flex justify-between items-center py-8">
          <TopicTag topic={topic} />
          <time
            dateTime={createdAt}
            className="font-semibold text-sm sm:text-base text-dim"
          >
            {formatTime(createdAt)}
          </time>
        </div>
        <ArrowLink href="/posts" direction="left">
          Back to posts
        </ArrowLink>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") return { notFound: true };

  const { content, ...outline } = getPostBySlug(slug);
  const { toc, html } = parseMd(content);

  return { props: { ...outline, toc, html } };
};
