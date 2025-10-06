import SupportTable from "@/components/page/support/SupportTable";
import { myFetch } from "@/utils/myFetch";
const SupportPage = async ({ searchParams }) => {
  const { status, search, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(search && { search }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/support?${queryParams.toString()}`, {
    tags: ["supports"],
    cache: "no-store",
  });

  const tickets = res?.data?.data;

  return (
    <section className="h-full">
      <SupportTable
        tickets={tickets || []}
        meta={{ ...res?.data?.meta, totalPage: res?.data?.meta?.totalPages }}
        filters={{ status }}
      />
    </section>
  );
};

export default SupportPage;
