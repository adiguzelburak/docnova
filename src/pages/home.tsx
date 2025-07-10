import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../features/invoice/invoiceSlice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../store";
import { message } from "antd";

export default function HomePage() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.invoice);

  console.log(loading);
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
        onSuccess: () => {
          messageApi.success("Invoices fetched successfully");
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
    <div>
      {contextHolder}
      <div>store.ts</div>
      <div>authSlice x2</div>
      <div>login.tsx</div>
    </div>
  );
}
