export interface AccountDetails {
  accountId:           string;
  balance:             number;
  currentPage:         number;
  totalPages:          number;
  pageSize:            number;
  accountOperationDTO: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
