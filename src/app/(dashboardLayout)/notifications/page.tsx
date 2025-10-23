import Notifications from "@/components/page/notifications/Notifications";
import { myFetch } from "@/utils/myFetch";

const NotificationPage = async ({ searchParams }) => {
  const { page } = await searchParams;

  // build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(page && { page }),
    ...{ limit: 50 },
  });

  const res = await myFetch(`/notification?${queryParams.toString()}`, {
    tags: ["notifications"],
  });

  return <Notifications data={res?.data?.data} meta={res?.data?.meta} />;
};

export default NotificationPage;
