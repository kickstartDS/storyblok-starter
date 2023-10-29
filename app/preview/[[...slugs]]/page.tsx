import { fetchStory } from "@/helpers/fetchStory";
import identifyPreview from "@/helpers/identifyPreview";
import StoryblokStory from "@storyblok/react/story";

type PageProps = {
  params: { slugs: string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Page({ params, searchParams }: PageProps) {
  const previewToken = process.env.storyblokApiToken;
  if (!previewToken) throw new Error("STORYBLOK_API_TOKEN missing");
  const preview = identifyPreview(searchParams, previewToken);
  const { data } = await fetchData(params.slugs?.join('/') || 'home', preview);

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}

async function fetchData(slug: string, preview: boolean) {
  return fetchStory(slug, preview);
}

export const revalidate = 0;
