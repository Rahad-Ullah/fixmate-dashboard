import PenaltyTable from "@/components/page/penalties/PenaltyTable";
import { myFetch } from "@/utils/myFetch";

const PenaltiesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const { type, search, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(type && { type: String(type) }),
    ...(search && { searchTerm: String(search) }),
    ...(page && { page: String(page) }),
    ...(limit && { limit: String(limit) }),
  });

  // Fetch data from the backend
  const res = await myFetch(`/penalty?${queryParams.toString()}`, {
    tags: ["penalties"],
  });

  const data = res?.data?.data || [];
  const meta = res?.data?.meta || {};

  return (
    <PenaltyTable
      data={data}
      meta={meta}
      filters={{ type, limit }}
    />
  );
};

export default PenaltiesPage;
