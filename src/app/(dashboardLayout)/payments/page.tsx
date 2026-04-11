import PaymentTable from "@/components/page/payments/PaymentTable";
import { myFetch } from "@/utils/myFetch";

const PaymentsPage = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const { paymentStatus, search, page } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(paymentStatus && { paymentStatus }),
    ...(search && { searchTerm: search }),
    ...(page && { page }),
    limit: "10",
  });

  // Fetch data from the backend
  const res = await myFetch(`/payment/history?${queryParams.toString()}`, {
    tags: ["payments"],
  });

  const data = res?.data?.data || [];
  const meta = res?.data?.meta || {};

  return (
    <PaymentTable
      data={data}
      meta={meta}
      filters={{ paymentStatus, limit: 10 }}
    />
  );
};

export default PaymentsPage;
