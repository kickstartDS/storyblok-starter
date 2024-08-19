import { FC, PropsWithChildren, createContext, useContext } from "react";

// TODO this 1920 should be read from a token probably
const ImageSizeContext = createContext<number>(1920);
export const ImageSizeProvider: FC<PropsWithChildren<{ size: number }>> = (
  props
) => (
  <ImageSizeContext.Provider value={props.size}>
    {props.children}
  </ImageSizeContext.Provider>
);

export const useImageSize = () => {
  return useContext(ImageSizeContext);
};
