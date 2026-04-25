import BookingsTable from "@/components/page/bookings/BookingTable";
import { myFetch } from "@/utils/myFetch";

const BookingsPage = async ({ searchParams }) => {
  const { search, bookingStatus, page, limit = 20 } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(search && { searchTerm: search }),
    ...(bookingStatus && { bookingStatus }),
    ...(page && { page }),
    ...(limit && { limit }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/bookings?${queryParams.toString()}`, {
    tags: ["bookings"],
    cache: "no-cache",
  });
  const bookings = res?.data?.data;
  const meta = res?.data?.meta;

  return (
    <>
      <BookingsTable
        data={bookings || []}
        meta={{ ...meta, totalPage: meta?.totalPage }}
        filters={{ bookingStatus, limit }}
      />
    </>
  );
};

export default BookingsPage;
