export interface ITag {
  group: string;
  expiration: number;
}

export interface IFormValues {
  firstName: string;
  lastName: string;
  birthDate: number;
  tags: ITag[];
}
