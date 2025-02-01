import { Button, Flex, Modal, Text } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

type ResetValueModalProps = {
  type: string;
  prevAmount: number;
};

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const ResetValueModal = ({ type, prevAmount }: ResetValueModalProps) => {
  const [opened, setOpened] = useState(false);
  const { addHistoryElement } = useContext(HistoryContext);
  const { resetAmount } = useContext(CategoriesContext);
  const { setAvailableCategories } = useContext(AvailableCategoriesContext);

  const navigate = useNavigate();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title={`Etes-vous sûr de vouloir réinitialiser vos dépenses?`}
      >
        <Text
          mt={-17}
          mb={20}
          size="xs"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
            lineHeight: 1.3,
          })}
        >
          Cette action peut être annulée ultérieurement en supprimant la transaction.{" "}
          {type === "Dépenses" &&
            "Cependant, les catégories de dépenses reviendront et le montant sera placé sous Non classé."}
        </Text>
        <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
          <Button
            color="red"
            onClick={() => {
              // sets the value of expenses/budget to 0
              resetAmount(type);
              setOpened(false);
              addHistoryElement({
                label: `Tout à bien été reinitialiser`,
                amount: prevAmount,
                id: crypto.randomUUID(),
                type: `${type} Reinitialiser`,
                dateCreated: "",
                category: `${type} Reinitialiser`,
              });
              if (type === "Dépenses") {
                // set the isused property on all items in the available categories array to false since all categories have 0 amounts now that the expenses have been reset
                setAvailableCategories((prev) => {
                  const arr: AvailableCategories[] = JSON.parse(
                    JSON.stringify(prev)
                  );
                  arr.forEach((c) => {
                    c.isused = "false";
                  });
                  return arr;
                });
              }
              // navigates to home page
              navigate("/");
            }}
          >
            Reinitialiser Tout
          </Button>
          <Button onClick={() => setOpened(false)} color="black">Annuler</Button>
        </div>
      </Modal>

      <Flex
        mt={20}
        direction="column"
        justify="center"          
        align="left" 
        style={{
          marginLeft: "680px",
        }}      
        >
        <Text
          size="xl"
          weight={700}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          Réinitialiser
        </Text>
        <Text
          size="xs"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
          })}
        >
          Réinitialiser tout à 0
        </Text>
        <Button mt={20} color="red" onClick={() => setOpened(true)} style={{
          width: "150px",
        }}>
          Réinitialiser
        </Button>
      </Flex>
    </>
  );
};

export default ResetValueModal;
