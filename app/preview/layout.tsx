import { StoryblokProvider } from "@/components/StoryblokProvider";

export default function PreviewLayout({ children }: React.PropsWithChildren) {
  return (
    <StoryblokProvider>
      {children}
    </StoryblokProvider>
  );
}