import { FC, PropsWithChildren, forwardRef, useContext } from "react";
import { HeadlineContext } from "@kickstartds/base/lib/headline";
import { useHeadlineLevel } from "./HeadlineLevelContext";

export const HeadlineProvider: FC<PropsWithChildren> = (props) => {
  const PrevHeadline = useContext(HeadlineContext);
  // eslint-disable-next-line react/display-name
  const Headline = forwardRef<HTMLElement, any>(({ level, ...props }, ref) => {
    const computedLevel = useHeadlineLevel();
    const nextLevel =
      level !== "p" && computedLevel ? "h" + computedLevel : level;
    return <PrevHeadline {...props} level={nextLevel} ref={ref} />;
  });
  return <HeadlineContext.Provider {...props} value={Headline} />;
};
