import { Table } from "antd";
import type { Content } from "../../features/invoice/types";
import { columns, expandColumns } from "../../pages/home/columns";

interface PaginationProps {
  page: number;
  size: number;
  totalCount: number;
}

const DataTable = ({
  dataSource,
  pagination,
  loading,
}: {
  dataSource: Content[];
  pagination: PaginationProps;
  loading: boolean;
}) => {
  const expandedRowRender = (record: Content) => (
    <Table<Content>
      columns={expandColumns}
      dataSource={[record]}
      pagination={false}
    />
  );

  return (
    <Table<Content>
      className="min-w-7xl"
      loading={loading}
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={dataSource.map((item) => ({
        ...item,
        key: item.id,
      }))}
      pagination={{
        pageSize: pagination.size,
        total: pagination.totalCount,
        current: pagination.page,
      }}
    />
  );
};

export default DataTable;
