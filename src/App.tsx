import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import "./App.css";
import { IFormValues } from "./IFormValues.type";
import LastNameInput from "./LastNameInput";
import MyDatePicker from "./MyDatePicker";

function App() {
  const {
    register, // don't need when using Controller
    handleSubmit,
    watch,
    control,
    formState: { errors, touchedFields },
  } = useForm<IFormValues>({ mode: "onBlur" });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: "tags" } as any
  );

  const onSubmit: SubmitHandler<IFormValues> = (values) => {
    console.log("onSubmit", values);
  };
  console.log("errors.firstName", errors.firstName);
  console.log("errors.lastName", errors.lastName);
  console.log("errors.tags", errors.tags);
  console.log("touchedFields", touchedFields);

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Form.Item
              label="First Name"
              validateStatus={fieldState.error ? "error" : undefined}
              help={fieldState.error && "First Name is required"}
            >
              <Input {...field} />
              <p>{fieldState.isTouched && "Touched"}</p>
              <p>{fieldState.isDirty && "Dirty"}</p>
            </Form.Item>
          </>
        )}
        rules={{ required: true }}
      />
      <LastNameInput control={control} />
      <div>
        <Controller
          control={control}
          name="birthDate"
          render={({ field, fieldState }) => (
            <Form.Item
              label={`Birth Date`}
              validateStatus={fieldState.error ? "error" : undefined}
              help={fieldState.error && "Group is required"}
            >
              <MyDatePicker
                value={field.value ? dayjs(field.value) : undefined}
                onChange={(v) => {
                  field.onChange(v?.valueOf() ?? null);
                }}
              />
            </Form.Item>
          )}
        />
      </div>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex" }}>
          <Controller
            name={`tags.${index}.group`}
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={`Group ${index}`}
                validateStatus={fieldState.error ? "error" : undefined}
                help={fieldState.error && "Group is required"}
              >
                <Input {...field} />
              </Form.Item>
            )}
            rules={{ required: true }}
          />
          <Controller
            name={`tags.${index}.expiration`}
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item
                label={`Expiration ${index}`}
                validateStatus={fieldState.error ? "error" : undefined}
                help={fieldState.error && "Expiration is required"}
              >
                <MyDatePicker
                  showTime
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(v) => {
                    field.onChange(v?.valueOf() ?? null);
                  }}
                />
              </Form.Item>
            )}
            rules={{ required: true }}
          />
          <Button
            onClick={() => {
              remove(index);
            }}
            icon={<DeleteOutlined />}
          />
          <Button
            disabled={index === 0}
            onClick={() => {
              move(index, index - 1);
            }}
            icon={<ArrowUpOutlined />}
          />
          <Button
            disabled={index === fields.length - 1}
            onClick={() => {
              move(index, index + 1);
            }}
            icon={<ArrowDownOutlined />}
          />
        </div>
      ))}
      <div>
        <Button
          onClick={() => {
            append({
              group: _.uniqueId("group"),
              expiration: dayjs().valueOf(),
            });
          }}
        >
          Append
        </Button>
        <Button
          onClick={() => {
            prepend({
              group: _.uniqueId("group"),
              expiration: dayjs().valueOf(),
            });
          }}
        >
          Prepend
        </Button>
      </div>
      <div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
      <h1>watch()</h1>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <h1>errors</h1>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <pre>
        {Object.keys(errors).length > 0 &&
          JSON.stringify(
            Object.entries(errors).reduce(
              (previous, [key, { ref, ...rest }]) => {
                previous[key] = rest;
                return previous;
              },
              {} as any
            ),
            null,
            2
          )}
      </pre>
      <h1>touchedFields</h1>
      <pre>{JSON.stringify(touchedFields, null, 2)}</pre>
    </Form>
  );
}

export default App;
