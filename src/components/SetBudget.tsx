import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import HistoryContext from "../store/HistoryContext.tsx";
import CategoriesContext from "../store/CategoriesContext"

const SetBudget = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { addCategory, getTotalAmount } = useContext(CategoriesContext);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="100%"
        placeholder="Ex: 5000"
        label="Entrer votre budget"
        withAsterisk
      />
      <Button
      color="green"
        mt={20}
        onClick={() => {
          // checks that the user inputted valid values
          if (value <= 0 || Number.isNaN(value)) {
            alert("Entrez une valeur valide s'il vous plaît");
          } else {
            const budget = getTotalAmount("Budget");
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: -1*budget,
            });
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: value,
            });
            // navigates back to home page
            navigate("/");
            addHistoryElement({
              label: "Votre budget est maintenant de: ",
              id: crypto.randomUUID(),
              amount: value,
              type: "Budget",
              dateCreated: "", 
              category: "Budget",
            });
          }
        }}
      >
        Valider votre budget
      </Button>
    </div>
  );
};

export default SetBudget;
