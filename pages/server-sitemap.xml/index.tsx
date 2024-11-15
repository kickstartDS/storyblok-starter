import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import { fetchPaths } from "@/helpers/storyblok";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const exclude = ["not-found"];
  const paths = await fetchPaths();

  return getServerSideSitemapLegacy(
    ctx,
    paths
      .filter((path) => !exclude.includes(path.params.slug.join("/")))
      .map((path) => {
        return {
          loc: `${process.env.NEXT_PUBLIC_SITE_URL}/${path.params.slug.join(
            "/"
          )}`,
          lastmod: path.params.updated_at || new Date().toISOString(),
        };
      })
  );
};

export default function Sitemap() {}
