import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../features/invoice/invoiceSlice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store";
import { message } from "antd";
import DataTable from "../../components/common/data-table";

export default function HomePage() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, invoices } = useSelector(
    (state: RootState) => state.invoice
  );

  const handleFetchInvoices = () => {
    dispatch(
      getInvoices({
        data: {
          companyId: "01c880ca-46b5-4699-a477-616b84770071",
          documentType: "OUTGOING",
          endDate: "2025-07-04T08:31:10.422Z",
          page: 0,
          size: 20,
          startDate: "2025-06-27T00:00:00.000Z",
          referenceDocument: "",
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        },
        onError: () => {
          messageApi.error("Error fetching invoices");
        },
      })
    );
  };
  useEffect(() => {
    handleFetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="w-full h-full flex flex-col">
      {contextHolder}
      <div className="flex-1 min-h-0">
        <DataTable
          loading={loading}
          dataSource={invoices.invoices?.content || []}
          pagination={{
            page: invoices.invoices?.pageable.pageNumber + 1,
            size: invoices.invoices?.pageable.pageSize || 20,
            totalCount: invoices.invoices?.totalElements || 0,
          }}
        />
      </div>
    </div>
  );
}
