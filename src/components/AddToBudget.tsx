import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import CategoriesContext from "../store/CategoriesContext";

const AddToBudget = () => {
  const { addCategory } = useContext(CategoriesContext);
  const { addHistoryElement } = useContext(HistoryContext);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="md"
        w="100%"
        placeholder="Ex: Bonus de fin d'année"
        label="Nom"
        withAsterisk
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="100%"
        placeholder="Ex: 3000"
        label="Montant"
        withAsterisk
      />
      <Button
      color="green"
        mt={20}
        onClick={() => {
          // Checks if the user input is valid
          if (label === "" || value <= 0 || Number.isNaN(value)) {
            alert(
              "Entrées invalides. Veuillez vérifier que le nom n'est pas vide et que le montant est un nombre positif"
            );
          } else {
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: value,
            });
            // navigate to home page
            navigate("/");
            addHistoryElement({
              label: label,
              amount: value,
              id: crypto.randomUUID(),
              type: "Budget",
              dateCreated: "",
              category: "Budget",
            });
          }
        }}
      >
        Ajouter au budget
      </Button>
    </div>
  );
};

export default AddToBudget;
