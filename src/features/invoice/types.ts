export interface InvoiceRequest {
  companyId: string;
  documentType: string;
  endDate: string;
  page: number;
  size: number;
  startDate: string;
  referenceDocument: string;
  type?: any;
  status?: any;
  paymentStatus?: any;
  isDeleted: boolean;
}

export interface InvoiceResponse {
  invoices: Invoices;
  netTotal: number;
  total: number;
  totalCount: number;
}
export interface Invoices {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Content {
  key: string;
  id: string;
  companyId: string;
  userId?: any;
  customerName: string;
  supplierName: string;
  supplierId: string;
  supplierVat: string;
  status: string;
  invoiceNumber: string;
  taxExclusiveAmount: number;
  taxInclusiveAmount: number;
  lineExtensionAmount: number;
  payableAmount: number;
  allowanceTotalAmount?: any;
  currency: string;
  createdTime: string;
  localCreatedTime: string;
  issueDate: string;
  deliveryDate?: any;
  dueDate: string;
  supplierCountryCode: string;
  supplierEndpoint: string;
  customerId?: string;
  customerVat: string;
  customerEndpoint?: string;
  customerCountryCode: string;
  typeCode?: number;
  documentType: string;
  errorMessage?: any;
  lastUpdatedTime: string;
  localLastUpdatedTime: string;
  type: string;
  idIncarcare?: any;
  idDescarcare?: any;
  source: string;
  sendViaPeppol: boolean;
  statusTime: string;
  fileName?: any;
  paymentDetails: PaymentDetails;
}
interface PaymentDetails {
  paymentStatus: string;
  paidAmount: number;
  totalAmount: number;
  remainingAmount: number;
}
