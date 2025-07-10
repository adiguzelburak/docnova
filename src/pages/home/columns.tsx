import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import type { Content } from "../../features/invoice/types";

export const expandColumns: TableColumnsType<Content> = [
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Currency", dataIndex: "currency", key: "currency" },
  { title: "Issue Date", dataIndex: "issueDate", key: "issueDate" },
  { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
  { title: "Payable Amount", dataIndex: "payableAmount", key: "payableAmount" },
  { title: "Document Type", dataIndex: "documentType", key: "documentType" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Supplier VAT", dataIndex: "supplierVat", key: "supplierVat" },
  { title: "Customer VAT", dataIndex: "customerVat", key: "customerVat" },
];

export const columns: TableColumnsType<Content> = [
  { title: "Name", dataIndex: "customerName", key: "customerName" },
  { title: "Platform", dataIndex: "supplierName", key: "supplierName" },
  { title: "Invoice Number", dataIndex: "invoiceNumber", key: "invoiceNumber" },
  {
    title: "Tax Exclusive Amount",
    dataIndex: "taxExclusiveAmount",
    key: "taxExclusiveAmount",
  },
  {
    title: "Tax Inclusive Amount",
    dataIndex: "taxInclusiveAmount",
    key: "taxInclusiveAmount",
  },
  { title: "Created Time", dataIndex: "createdTime", key: "createdTime" },
  {
    title: "Action",
    key: "operation",
    render: (_, record) => (
      <Link className="!underline" to={`/invoice/${record.id}`}>
        Details
      </Link>
    ),
  },
];
