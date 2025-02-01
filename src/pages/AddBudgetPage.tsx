import { Divider, Text } from "@mantine/core";
import AddToBudget from "../components/AddToBudget";
import SetBudget from "../components/SetBudget";
import PageContainer from "../layout/PageContainer";
import { useContext } from "react";
import ResetValueModal from "../components/ResetValueModal";
import CategoriesContext from "../store/CategoriesContext";

const AddBudgetPage = () => {
  const { getTotalAmount } = useContext(CategoriesContext) as {
    getTotalAmount: (type: string) => number;
  };
  const budget = getTotalAmount("Budget");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PageContainer>
        <div className="space-y-8">
          <div className="w-100">
            <Text
              className=" text-xl font-bold text-gray-900 dark:text-gray-100 flex text-center"
              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
            >
              Définissez votre revenu/budget
            </Text>
          </div>
          <br />
          <SetBudget />
          <br />
          <Divider className="my-8" />
          <br />
          <div>
            <Text className="text-xs text-gray-600 dark:text-gray-300 text-center ">
              S'ajoute à votre revenu/montant budgétaire actuel.
            </Text>
          </div>
          <AddToBudget />
          <br />

          <Divider className="" />
        </div>
      </PageContainer>
      <div
        style={{
          marginRight: "880px",
        }}
      >
        <ResetValueModal prevAmount={budget} type="Budget" />
      </div>
    </div>
  );
};

export default AddBudgetPage;
