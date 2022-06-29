export enum SortPropertEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  NAME_DESC = "name",
  NAME_ASC = "-name",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type SortType = {
  name: string;
  sortProperty: SortPropertEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}
