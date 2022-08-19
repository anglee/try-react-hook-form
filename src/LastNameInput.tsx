import { Tag } from "antd";
import { FC } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import FormInput from "./FormInput";
import { IFormValues } from "./types";

const LastNameInput: FC<{ control?: Control<IFormValues> }> = ({ control }) => {
  const { field, fieldState } = useController({
    control,
    name: "lastName",
    rules: { required: "Last Name is required" },
  });
  return (
    <>
      <FormInput
        required
        label="Last Name"
        error={fieldState.error?.message}
        {...field}
      />
      <div style={{ marginTop: 4 }}>
        {fieldState.isTouched && <Tag color="cyan">isTouched</Tag>}
        {fieldState.isDirty && <Tag color="cyan">isDirty</Tag>}
      </div>
    </>
  );
};

export default LastNameInput;
