import { fetchStory } from "@/helpers/fetchStory";
import { StoryblokComponent } from "@storyblok/react/rsc";

type PageProps = {
  params: { slugs: string[] | undefined };
};
export default async function Page({ params }: PageProps) {
  const { data } = await fetchData(params.slugs?.join("/") || "home");

  return (
    <div>
      <StoryblokComponent blok={data.story.content} />
    </div>
  );
}

async function fetchData(slug: string) {
  return fetchStory(slug, false);
}

export const revalidate = 0;
