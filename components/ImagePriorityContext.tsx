import { FC, PropsWithChildren, createContext, useContext } from "react";

const ImagePriorityContext = createContext<boolean>(false);
export const ImagePriorityProvider: FC<
  PropsWithChildren<{ priority: boolean }>
> = (props) => (
  <ImagePriorityContext.Provider value={props.priority}>
    {props.children}
  </ImagePriorityContext.Provider>
);

export const useImagePriority = () => {
  return useContext(ImagePriorityContext);
};
