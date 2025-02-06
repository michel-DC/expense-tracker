import { Divider, Text } from "@mantine/core";
import AddToExpenses from "../components/AddToExpenses";
import PageContainer from "../layout/PageContainer";
import { useContext } from "react";
import ResetValueModal from "../components/ResetValueModal";
import Dividere from "../components/DividerComponents";
import CategoriesContext from "../store/CategoriesContext";

const AddExpensePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const expenses = getTotalAmount("Expenses");

  return (
    <PageContainer>
      <Text
        className="fixed"
        style={{
          display: "flex",
          textAlign: "left",
          marginLeft: window.innerWidth < 200 ? "0" : "585px",
        }}
        size="xl"
        weight={700}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
      >
        Ajouter une dépense
      </Text>

      <Text
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        size="xs"
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[0],
        })}
      >
        S'ajoute au montant de vos dépenses actuelles.
      </Text>

      <AddToExpenses />
      <br />
      <Dividere />
      <div
        style={{
          display: "flex",
          marginRight: window.innerWidth < 768 ? "0" : "300px",
          marginLeft: window.innerWidth < 768 ? "0" : "-90px",
        }}
      >
        <ResetValueModal prevAmount={expenses} type="Expenses" />
      </div>
    </PageContainer>
  );
};

export default AddExpensePage;
