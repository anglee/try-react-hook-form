import { ITag } from "./ITag.type";

export interface IFormValues {
  firstName: string;
  lastName: string;
  birthDate: number;
  tags: ITag[];
}
