import {
  FC,
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { HeadlineProvider } from "./HeadlineProvider";
import { SectionProvider } from "../section/SectionProvider";

const HeadlineLevelContext = createContext<
  [initialLevel: number, isFirstHeadlineRef?: MutableRefObject<boolean>]
>([1]);

export const HeadlineLevelProvider: FC<PropsWithChildren> = ({ children }) => {
  const [parentInitialLevel, parentIsFirstHeadlineRef] =
    useContext(HeadlineLevelContext);

  // @refresh reset
  const isFirstHeadlineRef = useRef(true);
  const initialLevel =
    !parentIsFirstHeadlineRef || parentIsFirstHeadlineRef.current
      ? parentInitialLevel
      : parentInitialLevel + 1;

  // prevent first section without headlines to increase the headline level
  // this component has to run _after_ the children to check if any headlines were rendered
  const UpdateParent = useCallback<FC>(() => {
    if (parentIsFirstHeadlineRef?.current) {
      parentIsFirstHeadlineRef.current = isFirstHeadlineRef.current;
    }
    return null;
  }, [parentIsFirstHeadlineRef]);

  return (
    <>
      <HeadlineLevelContext.Provider value={[initialLevel, isFirstHeadlineRef]}>
        <SectionProvider>
          <HeadlineProvider>{children}</HeadlineProvider>
        </SectionProvider>
      </HeadlineLevelContext.Provider>
      <UpdateParent />
    </>
  );
};

export const useHeadlineLevel = () => {
  const [initialLevel, isFirstHeadlineRef] = useContext(HeadlineLevelContext);
  if (isFirstHeadlineRef?.current) {
    isFirstHeadlineRef.current = false;
    return initialLevel;
  } else {
    return initialLevel + 1;
  }
};
