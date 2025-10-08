import Notifications from "@/components/page/notifications/Notifications";
import PageTitle from "@/components/shared/PageTitle";
import { myFetch } from "@/utils/myFetch";

const NotificationPage = async ({ searchParams }) => {
  const { page } = await searchParams;

  // build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(page && { page }),
  });

  const res = await myFetch(`/notification?${queryParams.toString()}`, {
    tags: ["notifications"],
  });

  return (
    <div className="flex flex-col gap-6 px-4">
      <section>
        <PageTitle>Notifications</PageTitle>
      </section>
      <Notifications data={res?.data?.data} meta={res?.data?.meta} />
    </div>
  );
};

export default NotificationPage;
