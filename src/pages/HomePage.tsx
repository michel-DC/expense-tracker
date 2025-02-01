import { useContext } from "react";
import { SimpleGrid, Text } from "@mantine/core";
import DisplayCard from "../components/DisplayCard";
import HistoryStack from "../components/HistoryStack";
import PageContainer from "../layout/PageContainer";
import CategoriesContext from "../store/CategoriesContext";

const HomePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");

  return (
    <PageContainer>
      {/* Displays the net balance of the user */}
      <Text
      style={{ textAlign: "center" }}
        size="xl"
        weight={700}
        mb={20}
        sx={(theme: any) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[1]
              : theme.colors.gray[9],
        })}
      >
        VOTRE BALANCE EST DE : {budget - expenses}€
      </Text>
      <SimpleGrid cols={2} style={{ justifyContent: "center" }}>
        <DisplayCard label="Arrivé / Budget" amount={budget} color="green.4" />
        <DisplayCard label="Dépense" amount={expenses} color="red.4" />
      </SimpleGrid>
      <HistoryStack />
    </PageContainer>
  );
};

export default HomePage;
