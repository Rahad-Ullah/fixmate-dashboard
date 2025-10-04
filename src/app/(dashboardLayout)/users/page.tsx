import UsersTable from "@/components/page/users/UsersTable";
import { myFetch } from "@/utils/myFetch";
const UsersPage = async ({ searchParams }) => {
  const { role, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/admin/users?${queryParams.toString()}`, {
    tags: ["users"],
    cache: "no-store",
  });

  return (
    <>
      <UsersTable
        users={res?.data as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ role }}
      />
    </>
  );
};

export default UsersPage;
