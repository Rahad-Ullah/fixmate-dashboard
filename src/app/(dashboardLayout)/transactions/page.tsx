import TransactionTable from "@/components/page/transactions/TransactionTable";
import { myFetch } from "@/utils/myFetch";

const TransactionsPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const { type, search, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(type && { type: String(type) }),
    ...(search && { searchTerm: String(search) }),
    ...(page && { page: String(page) }),
    ...(limit && { limit: String(limit) }),
  });

  // Fetch data from the backend using the 'transactions' endpoint
  const res = await myFetch(`/transactions?${queryParams.toString()}`, {
    tags: ["transactions"],
  });


  const data = res?.data?.data || [];
  const meta = res?.data?.meta || {};

  return (
    <TransactionTable
      data={data}
      meta={meta}
      filters={{ type, limit }}
    />
  );
};

export default TransactionsPage;
