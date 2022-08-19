import { Form, Input } from "antd";
import React from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import { IFormValues } from "./IFormValues.type";

const LastNameInput = ({ control }: { control?: Control<IFormValues> }) => {
  const { field, fieldState } = useController({
    control,
    name: "lastName",
    rules: { required: true },
  });
  return (
    <>
      <Form.Item
        label="Last Name"
        validateStatus={fieldState.error ? "error" : undefined}
        help={fieldState.error && "Last Name is required"}
      >
        <Input {...field} />
        <p>{fieldState.isTouched && "Touched"}</p>
        <p>{fieldState.isDirty && "Dirty"}</p>
      </Form.Item>
    </>
  );
};

export default LastNameInput;
