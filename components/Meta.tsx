import Head from "next/head";
import { SeoStoryblok } from "@/types/components-schema";

export default function Meta({
  pageSeo,
  globalSeo,
  fallbackName,
}: {
  pageSeo?: SeoStoryblok;
  globalSeo?: SeoStoryblok;
  fallbackName?: string;
}) {
  const titleSegments: string[] = [];
  if (pageSeo?.title) {
    titleSegments.push(pageSeo.title);
  } else if (fallbackName) {
    titleSegments.push(fallbackName);
  }
  if (globalSeo?.title) {
    titleSegments.push(globalSeo.title);
  }
  const title = titleSegments.join(" - ");
  const description = pageSeo?.description || globalSeo?.description;
  const socialImageUrl = pageSeo?.image?.filename || globalSeo?.image?.filename;

  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={pageSeo?.keywords || globalSeo?.keywords}
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {socialImageUrl && (
        <meta name="image" property="og:image" content={socialImageUrl} />
      )}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {socialImageUrl && <meta name="twitter:image" content={socialImageUrl} />}
      <style>{`body { display: block !important }`}</style>
    </Head>
  );
}
