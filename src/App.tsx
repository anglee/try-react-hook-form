import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Tag } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import "antd/dist/antd.css";
import "./index.css";
import { IFormValues } from "./types";
import LastNameInput from "./LastNameInput";
import DatePicker from "./DayJsDatePicker";

// also check https://codesandbox.io/s/react-hook-form-v7-controller-forked-gm73w2?file=/src/AntD.js

function App() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, touchedFields },
    setValue,
  } = useForm<IFormValues>({ mode: "onBlur" });

  const { fields, append, prepend, remove, move } = useFieldArray({
    control,
    name: "tags",
  } as any);

  const onSubmit: SubmitHandler<IFormValues> = (values) => {
    console.log("onSubmit", values);
  };
  return (
    <Form requiredMark onFinish={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <>
            <Form.Item
              required
              label="First Name"
              validateStatus={fieldState.error && "error"}
              help={fieldState.error && "This is required"}
            >
              <Input {...field} />
              <div style={{ marginTop: 4 }}>
                {fieldState.isTouched && <Tag color="cyan">isTouched</Tag>}
                {fieldState.isDirty && <Tag color="cyan">isDirty</Tag>}
              </div>
            </Form.Item>
          </>
        )}
      />
      <LastNameInput control={control} />
      <div>
        <Controller
          control={control}
          name="birthDate"
          rules={{
            validate: {
              required: (v) => {
                if (_.isNil(v)) {
                  return "Please enter a valid date & time";
                }
              },
              future: (v) => {
                if (!_.isNil(v) && dayjs(v).isAfter(dayjs())) {
                  return "Are you traveling from the future?";
                }
              },
            },
          }}
          render={({ field, fieldState }) => (
            <Form.Item
              label={`Birth Date`}
              required
              validateStatus={fieldState.error && "error"}
              help={fieldState.error?.message}
            >
              <DatePicker
                value={field.value ? dayjs(field.value) : undefined}
                onChange={(v) => {
                  field.onChange(v?.valueOf() ?? null);
                  field.onBlur(); // trigger validation
                }}
                onBlur={field.onBlur}
              />
            </Form.Item>
          )}
        />
      </div>
      <div>Groups</div>
      <div style={{ border: "1px solid black", padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Button
            onClick={() => {
              append({
                group: _.uniqueId("group"),
                expiration: dayjs().valueOf(),
              });
            }}
          >
            Append group
          </Button>
          <Button
            onClick={() => {
              prepend({
                group: _.uniqueId("group"),
                expiration: dayjs().valueOf(),
              });
            }}
          >
            Prepend group
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", gap: 8 }}>
            <Controller
              name={`tags.${index}.group`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Form.Item
                  required
                  label={`Group ${index}`}
                  validateStatus={fieldState.error ? "error" : undefined}
                  help={fieldState.error && "Group is required"}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <Controller
              name={`tags.${index}.expiration`}
              control={control}
              render={({ field, fieldState }) => (
                <Form.Item label={`Expiration`}>
                  <DatePicker
                    showTime
                    value={field.value ? dayjs(field.value) : undefined}
                    onChange={(v) => {
                      field.onChange(v?.valueOf() ?? null);
                    }}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              )}
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
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          onClick={() => {
            setValue("firstName", "Foo");
            setValue("lastName", "Bar");
            setValue("birthDate", dayjs().valueOf());
            setValue("tags", [
              { group: "apple", expiration: dayjs("2022-01-01").valueOf() },
              { group: "bee", expiration: dayjs("2022-02-01").valueOf() },
              { group: "cat", expiration: dayjs("2022-03-01").valueOf() },
            ]);
          }}
        >
          Prefill values
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
      <h1>watch()</h1>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <h1>errors</h1>
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
