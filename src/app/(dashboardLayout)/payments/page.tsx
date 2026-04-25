import PaymentTable from "@/components/page/payments/PaymentTable";
import { myFetch } from "@/utils/myFetch";

const PaymentsPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const { paymentStatus, search, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(paymentStatus && { paymentStatus: String(paymentStatus) }),
    ...(search && { searchTerm: String(search) }),
    ...(page && { page: String(page) }),
    ...(limit && { limit: String(limit) }),
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
      filters={{ paymentStatus, limit }}
    />
  );
};

export default PaymentsPage;
