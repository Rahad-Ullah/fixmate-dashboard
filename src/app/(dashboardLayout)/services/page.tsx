import ServiceTable from "@/components/page/services/ServiceTable";
import { myFetch } from "@/utils/myFetch";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const { isSuspended, search, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(isSuspended && { isSuspended: String(isSuspended) }),
    ...(search && { searchTerm: String(search) }),
    ...(page && { page: String(page) }),
    ...(limit && { limit: String(limit) }),
  });

  // Fetch data from the backend
  const res = await myFetch(`/services?${queryParams.toString()}`, {
    tags: ["services"],
  });

  const data = res?.data?.data || [];
  const meta = res?.data?.meta || {};

  return (
    <ServiceTable
      data={data}
      meta={meta}
      filters={{ isSuspended, limit }}
    />
  );
};

export default ServicesPage;
