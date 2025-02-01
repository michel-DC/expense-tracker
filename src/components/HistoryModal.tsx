import { Button, Modal, Text } from "@mantine/core";
import { useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

type HistoryModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  label: string;
  amount: number;
  dateCreated: string;
  id: string;
  type: string;
  category: string;
};

const HistoryModal = ({
  opened,
  setOpened,
  label,
  amount,
  dateCreated,
  type,
  id,
  category,
}: HistoryModalProps) => {
  const { deleteHistoryElement } = useContext(HistoryContext);
  const { subtractCategoryAmount, addCategory } = useContext(
    CategoriesContext
  );

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Details de votre transaction"
      styles={{
        title: {
          fontSize: 20,
        },
      }}
    >
      <Text>
        <span style={{ fontWeight: "bold" }}>Nom</span> {label}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Montant:</span> 
        {amount.toLocaleString()} €
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Type:</span> {type}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Categorie:</span> {category}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Date de création:</span> {dateCreated}
      </Text>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Button
        color="green"
          onClick={() => {
            setOpened(false);
          }}
        >
          Annuler
        </Button>
        <Button
          color="red"
          onClick={() => {
            // based on the type of transaction adjust the budget / expense amount accordingly
            deleteHistoryElement(id);
            if (type === "Expenses Reset") {
              // put the returned expenses in the Uncategorized category
              addCategory({
                label: "Uncategorized",
                amount: amount,
                id: crypto.randomUUID(),
              });
            } else if (type === "Budget Reset") {
              addCategory({
                label: "Budget",
                amount: amount,
                id: crypto.randomUUID(),
              });
            }
            // subtract the amount of the removed transaction from the category it belonged to
            subtractCategoryAmount(category, amount);
            setOpened(false);
          }}
        >
          Supprimer cette transaction
        </Button>
      </div>
    </Modal>
  );
};

export default HistoryModal;
