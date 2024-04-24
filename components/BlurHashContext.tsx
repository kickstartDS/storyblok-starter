import { FC, PropsWithChildren, createContext, useContext } from "react";

const BlurHashContext = createContext<Record<string, string>>({});
export const BlurHashProvider: FC<
  PropsWithChildren<{ blurHashes: Record<string, string> }>
> = (props) => (
  <BlurHashContext.Provider value={props.blurHashes}>
    {props.children}
  </BlurHashContext.Provider>
);

export const useBlurHashes = () => {
  return useContext(BlurHashContext);
};
