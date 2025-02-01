import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode, useContext } from "react";
import AvailableCategoriesContext from "./AvailableCategoriesContext";

type Category = {
  label: string;
  id: string;
  amount: number;
};

type CategoriesContextType = {
  categories: Category[];
  getTotalAmount: (type: string) => number;
  resetAmount: (type: string) => void;
  addCategory: (newCategory: Category) => void;
  deleteCategory: (label: string) => void;
  subtractCategoryAmount: (label: string, amount: number) => void;
};

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  getTotalAmount: () => 0,
  resetAmount: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  subtractCategoryAmount: () => {},
});

export function CategoriesContextProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useLocalStorage<Category[]>({
    key: "categories",
    defaultValue: [],
  });
  const { setAvailableCategories } = useContext(AvailableCategoriesContext);

  const getTotalAmount = (type: string) => {
    return categories.reduce((total, category) => {
      const isBudget = category.label === "Budget";
      if (type === "Expenses" && !isBudget) {
        return total + category.amount;
      } else if (type === "Budget" && isBudget) {
        return total + category.amount;
      }
      return total;
    }, 0);
  };

  const resetAmount = (type: string) => {
    setCategories((prev) =>
      prev.filter((c) => (type === "Budget" ? c.label === "Budget" : c.label !== "Budget"))
    );
  };

  const addCategory = (newCategory: Category) => {
    setCategories((prev) => {
      const existing = prev.find((c) => c.label === newCategory.label);
      if (existing) {
        return prev.map((c) =>
          c.label === newCategory.label ? { ...c, amount: c.amount + newCategory.amount } : c
        );
      }
      return [...prev, newCategory];
    });
  };

  const deleteCategory = (label: string) => {
    setCategories((prev) => prev.filter((c) => c.label !== label));
  };

  const subtractCategoryAmount = (label: string, amount: number) => {
    setCategories((prev) => {
      return prev
        .map((c) => (c.label === label ? { ...c, amount: c.amount - amount } : c))
        .filter((c) => c.amount > 0);
    });

    setAvailableCategories((prev) =>
      prev.map((category) =>
        category.label === label ? { ...category, isused: "false" } : category
      )
    );
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, getTotalAmount, resetAmount, addCategory, deleteCategory, subtractCategoryAmount }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;
