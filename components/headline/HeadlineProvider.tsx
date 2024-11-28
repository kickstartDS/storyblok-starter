import { FC, PropsWithChildren, forwardRef, useContext } from "react";
import slugify from "slugify";
import { HeadlineContext } from "@kickstartds/base/lib/headline";
import { useHeadlineLevel } from "./HeadlineLevelContext";

export const HeadlineProvider: FC<PropsWithChildren> = (props) => {
  const PrevHeadline = useContext(HeadlineContext);
  // eslint-disable-next-line react/display-name
  const Headline = forwardRef<HTMLElement, any>(({ level, ...props }, ref) => {
    const computedLevel = useHeadlineLevel();
    const nextLevel =
      level !== "p" && computedLevel ? "h" + computedLevel : level;
    const headlineSlug = slugify(props.text, { lower: true });
    return (
      <PrevHeadline {...props} level={nextLevel} id={headlineSlug} ref={ref} />
    );
  });
  return <HeadlineContext.Provider {...props} value={Headline} />;
};
