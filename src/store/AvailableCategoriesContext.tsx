import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode } from "react";

type AvailableCategoriesContextProps = {
  children: ReactNode;
};

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

type CallBack = (prev: AvailableCategories[]) => AvailableCategories[];

type AvailableCategoriesContextType = {
  availableCategories: AvailableCategories[];
  setAvailableCategories: (callBack: CallBack) => void;
};

const AvailableCategoriesContext =
  createContext<AvailableCategoriesContextType>({
    availableCategories: [],
    setAvailableCategories: () => {},
  });

export function AvailableCategoriesContextProvider({
  children,
}: AvailableCategoriesContextProps) {
  const [availableCategories, setAvailableCategories] = useLocalStorage<
    AvailableCategories[]
  >({
    key: "multiSelectCategories",
    defaultValue: [
      {
        label: "Divertissement",
        value: "Divertissement",
        isused: "false",
      },
      {
        label: "Courses",
        value: "Courses",
        isused: "false",
      },
      { label: "Non catégorisé", value: "Non-catégorisé", isused: "false" },
    ],
  });

  function setAvailableCategoriesHandler(callBack: CallBack) {
    setAvailableCategories(callBack);
  }

  const context = {
    availableCategories: availableCategories,
    setAvailableCategories: setAvailableCategoriesHandler,
  };

  return (
    <AvailableCategoriesContext.Provider value={context}>
      {children}
    </AvailableCategoriesContext.Provider>
  );
}

export default AvailableCategoriesContext;
