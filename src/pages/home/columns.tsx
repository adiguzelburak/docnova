import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import type { Content } from "../../features/invoice/types";
import { format } from "date-fns";

export const getExpandColumns = (
  t: (key: string) => string
): TableColumnsType<Content> => [
  {
    title: t("status"),
    dataIndex: "status",
    key: "status",
  },
  {
    title: t("currency"),
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: t("issueDate"),
    dataIndex: "issueDate",
    key: "issueDate",
    render: (value) => (value ? format(new Date(value), "dd.MM.yyyy") : "-"),
  },
  {
    title: t("dueDate"),
    dataIndex: "dueDate",
    key: "dueDate",
    render: (value) => (value ? format(new Date(value), "dd.MM.yyyy") : "-"),
  },
  {
    title: t("payableAmount"),
    dataIndex: "payableAmount",
    key: "payableAmount",
    render: (value) => <span>€{value}</span>,
  },
  {
    title: t("documentType"),
    dataIndex: "documentType",
    key: "documentType",
  },
  {
    title: t("type"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("supplierVat"),
    dataIndex: "supplierVat",
    key: "supplierVat",
  },
  {
    title: t("customerVat"),
    dataIndex: "customerVat",
    key: "customerVat",
  },
];

export const getColumns = (
  t: (key: string) => string
): TableColumnsType<Content> => [
  {
    title: t("name"),
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: t("platform"),
    dataIndex: "supplierName",
    key: "supplierName",
  },
  {
    title: t("invoiceNumber"),
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
  },
  {
    title: t("taxExclusiveAmount"),
    dataIndex: "taxExclusiveAmount",
    key: "taxExclusiveAmount",
    render: (value) => <span>€{value}</span>,
  },
  {
    title: t("taxInclusiveAmount"),
    dataIndex: "taxInclusiveAmount",
    key: "taxInclusiveAmount",
    render: (value) => <span>€{value}</span>,
  },
  {
    title: t("createdTime"),
    dataIndex: "createdTime",
    key: "createdTime",
    render: (value) => <span>{format(new Date(value), "dd.MM.yyyy")}</span>,
  },
  {
    title: t("action"),
    key: "operation",
    render: (_, record) => (
      <Link
        className="!underline text-blue-600 hover:text-blue-800"
        to={`/invoice/${record.id}`}
      >
        {t("details")}
      </Link>
    ),
  },
];
