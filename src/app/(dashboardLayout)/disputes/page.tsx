import DisputeTable from "@/components/page/disputes/DisputeTable";
import { myFetch } from "@/utils/myFetch";

const DisputesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const { status, search, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status: String(status) }),
    ...(search && { searchTerm: String(search) }),
    ...(page && { page: String(page) }),
    ...(limit && { limit: String(limit) }),
  });

  // Fetch data from the backend
  const res = await myFetch(`/dispute?${queryParams.toString()}`, {
    tags: ["disputes"],
  });

  // Extract data from 'result' as per backend DisputeService
  const data = res?.data?.result || [];
  const meta = res?.data?.meta || {};

  return (
    <DisputeTable
      data={data}
      meta={meta}
      filters={{ status, limit }}
    />
  );
};

export default DisputesPage;
