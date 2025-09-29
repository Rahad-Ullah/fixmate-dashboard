import SupportTable from "@/components/page/support/SupportTable";
import { demoSupportTicketsData } from "@/demoData/support";
const SupportPage = async ({ searchParams }) => {
  const { status } = await searchParams;

  const tickets = demoSupportTicketsData?.filter(
    (item) => !status || item?.status === status
  );

  return (
    <section className="h-full">
      <SupportTable
        tickets={tickets as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 }}
        filters={{ status }}
      />
    </section>
  );
};

export default SupportPage;
