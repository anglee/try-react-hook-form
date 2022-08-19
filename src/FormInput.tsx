import { Form, Input, InputProps } from "antd";
import { FC, forwardRef, ReactNode, Ref } from "react";

interface IProps extends InputProps {
  label: ReactNode;
  error?: string;
  required?: boolean;
}

const FormInput: FC<IProps> = forwardRef(
  ({ label, error, required, ...props }: IProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Form.Item
        required={required}
        label={label}
        validateStatus={error && "error"}
        help={error}
      >
        <Input {...props} />
      </Form.Item>
    );
  }
);

export default FormInput;
