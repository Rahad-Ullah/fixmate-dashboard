import BookingsTable from "@/components/page/bookings/BookingTable";
import { demoBookingsData } from "@/demoData/bookings";

const BookingsPage = async ({ searchParams }) => {
  const { search } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(role && { role }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  return (
    <>
      <BookingsTable
        users={demoBookingsData as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ search }}
      />
    </>
  );
};

export default BookingsPage;
