import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";

const MyDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default MyDatePicker;
