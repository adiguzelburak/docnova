import { Table } from "antd";
import { useTranslation } from "react-i18next";
import type { Content } from "../../features/invoice/types";
import { getColumns, getExpandColumns } from "../../pages/home/columns";

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
  const { t } = useTranslation();

  const columns = getColumns(t);
  const expandColumns = getExpandColumns(t);

  const expandedRowRender = (record: Content) => (
    <Table<Content>
      columns={expandColumns}
      dataSource={[record]}
      pagination={false}
      scroll={{ x: 800 }}
      size="small"
    />
  );

  return (
    <div className="w-full overflow-hidden">
      <Table<Content>
        className="w-full"
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={dataSource.map((item) => ({
          ...item,
          key: item.id,
        }))}
        scroll={{
          x: 1200,
          y: "calc(100vh - 300px)",
        }}
        pagination={{
          pageSize: pagination.size,
          total: pagination.totalCount,
          current: pagination.page,
        }}
        size="middle"
        bordered
      />
    </div>
  );
};

export default DataTable;
