import BookingsTable from "@/components/page/bookings/BookingTable";
import { myFetch } from "@/utils/myFetch";

const BookingsPage = async ({ searchParams }) => {
  const { search, status, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(search && { search }),
    ...(status && { status }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/admin/bookings?${queryParams.toString()}`, {
    tags: ["bookings"],
    cache: "no-store",
  });
  const bookings = res?.data?.data;
  const meta = res?.data?.meta;
  console.log(bookings);

  return (
    <>
      <BookingsTable
        users={bookings || []}
        meta={{ ...meta, totalPage: meta?.totalPages }}
        filters={{ status }}
      />
    </>
  );
};

export default BookingsPage;
