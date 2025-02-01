import { Button, Divider, MultiSelect, Text, TextInput } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import DeleteCatToolTip from "./DeleteCatToolTip";

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const AddToExpenses = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { availableCategories, setAvailableCategories } = useContext(
    AvailableCategoriesContext
  );
  const { addCategory } = useContext(CategoriesContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  const [category, setCategory] = useState<string[]>([""]);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <TextInput
          onChange={(e) => setLabel(e.currentTarget.value)}
          mt={20}
          size="md"
          w="100%"
          placeholder="Ex: course Auchan"
          label="Nom de la dépense"
          withAsterisk
        />
        <TextInput
          onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
          mt={20}
          size="md"
          w="100%"
          placeholder="Ex: 120"
          label="Montant"
          withAsterisk
        />
        <Divider mt={30} mb={20} />
        <Text
          style={{
            display: "flex",
            textAlign: "left",
          }}
          size="xl"
          weight={700}
          color="white"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          Ajoutez une catégorie à vos dépenses
        </Text>
        <MultiSelect
          w="100%"
          mt={10}
          data={availableCategories}
          label="Choisissez une catégorie"
          placeholder="Selectionnez une catégorie ou crée en une"
          searchable
          creatable
          value={category}
          onChange={setCategory}
          maxSelectedValues={1}
          getCreateLabel={(query) =>
            `+ Créer ${query[0].toUpperCase() + query.substring(1)}`
          }
          onCreate={(query) => {
            const capQuery = query[0].toUpperCase() + query.substring(1);
            const item = {
              value: capQuery,
              label: capQuery,
              isused: "false",
            };
            console.log("hello");

            setAvailableCategories((current) => [item, ...current]);
            return item;
          }}
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <Button
            color="green"
            mr={30}
            onClick={() => {
              if (label === "" || value <= 0 || Number.isNaN(value)) {
                alert(
                  "Entrées invalides. Assurez-vous que le nom de la dépense n'est pas vide et que le montant est supérieur à zéro."
                );
              } else {
                category[0] === undefined ||
                category[0] === null ||
                category[0] === ""
                  ? (category[0] = "Non classé")
                  : null;
                addCategory({
                  label: category[0],
                  amount: value,
                  id: crypto.randomUUID(),
                });
                setAvailableCategories((prev) => {
                  return prev.map((c) => {
                    if (c.label === category[0]) {
                      c.isused = "true";
                    }
                    return c;
                  });
                });
                navigate("/");
                addHistoryElement({
                  label: label,
                  amount: value,
                  id: crypto.randomUUID(),
                  type: "Dépense",
                  dateCreated: "",
                  category: category[0],
                });
              }
            }}
          >
            Ajouter une dépense
          </Button>
          <Button
            color="red"
            onClick={() => {
              if (category[0] === "") {
                alert("Aucune catégorie n'a été sélectionnée !");
              } else {
                if (category[0] === "Uncategorized") {
                  alert("Non classé ne peut pas être supprimé !");
                  return;
                }
                let removed = false;
                setAvailableCategories((prev) => {
                  const arr: AvailableCategories[] = JSON.parse(
                    JSON.stringify(prev)
                  );
                  arr.forEach((c, index) => {
                    if (c.label === category[0] && c.isused === "false") {
                      arr.splice(index, 1);
                      removed = true;
                    }
                  });

                  return arr;
                });
                removed
                  ? null
                  : alert(
                      "La catégorie ne peut pas être supprimée car elle est utilisée."
                    );
              }
            }}
          >
            Supprimer une catégorie
          </Button>
          <DeleteCatToolTip />
        </div>
      </div>
    </div>
  );
};

export default AddToExpenses;
