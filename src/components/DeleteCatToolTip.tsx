import { ActionIcon, Tooltip } from "@mantine/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
const DeleteCatToolTip = () => {
  return (
    <Tooltip
      label="Sélectionnez une catégorie et cliquez sur « Supprimer la catégorie » pour supprimer la catégorie sélectionnée. Cela supprimera uniquement la catégorie du menu déroulant. Vous ne pouvez pas supprimer une catégorie en cours d'utilisation."
      color="gray.8"
      withArrow
      multiline
      style={{ width: 400 }}
    >
      <ActionIcon variant="transparent">
        <AiOutlineInfoCircle />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteCatToolTip;
