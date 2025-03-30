import { EntityFormConfig } from "@app/components/entity-form";

const useCharacterForm = () => {
  const entityFormConfig: EntityFormConfig = {
    fields: {
      name: {
        name: "name",
        type: "text",
        required: true,
      },
      status: {
        name: "status",
        type: "text",
        required: true,
      },
    },
  };
  return entityFormConfig;
};

export default useCharacterForm;
