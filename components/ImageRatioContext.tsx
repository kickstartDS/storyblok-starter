import { FC, PropsWithChildren, createContext, useContext } from "react";

const ImageRatioContext = createContext<number>(-1);
export const ImageRatioProvider: FC<PropsWithChildren<{ ratio: number }>> = (
  props
) => (
  <ImageRatioContext.Provider value={props.ratio}>
    {props.children}
  </ImageRatioContext.Provider>
);

export const useImageRatio = () => {
  return useContext(ImageRatioContext);
};
