import { FC, PropsWithChildren, forwardRef, useContext } from "react";
import { SectionContext } from "@kickstartds/base/lib/section";
import { HeadlineLevelProvider } from "../headline/HeadlineLevelContext";

export const SectionProvider: FC<PropsWithChildren> = (props) => {
  const PrevSection = useContext(SectionContext);
  // eslint-disable-next-line react/display-name
  const Section = forwardRef<HTMLDivElement, any>((props, ref) => (
    <HeadlineLevelProvider>
      <PrevSection {...props} ref={ref} />
    </HeadlineLevelProvider>
  ));
  return <SectionContext.Provider {...props} value={Section} />;
};
