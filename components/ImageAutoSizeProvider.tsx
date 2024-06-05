import {
  FC,
  ImgHTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useContext,
} from "react";
import { PictureContext } from "@kickstartds/base/lib/picture";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

export const ImageAutoSizeProvider: FC<PropsWithChildren> = ({ children }) => {
  const UpstreamPicture = useContext(PictureContext);
  // eslint-disable-next-line react/display-name
  const Picture = forwardRef<
    HTMLImageElement,
    PictureProps & ImgHTMLAttributes<HTMLImageElement>
  >(
    // @ts-expect-error
    (props, ref) => <UpstreamPicture {...props} ref={ref} autoSize />
  );

  return (
    <PictureContext.Provider value={Picture}>
      {children}
    </PictureContext.Provider>
  );
};
