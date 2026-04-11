import UsersTable from "@/components/page/users/UsersTable";
import { myFetch } from "@/utils/myFetch";
const UsersPage = async ({ searchParams }) => {
  const { role, search, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(search && { searchTerm: search }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/user?${queryParams.toString()}`, {
    tags: ["users"],
  });

  return (
    <>
      <UsersTable
        users={res?.data?.data || ([] as never[])}
        meta={res?.data?.meta}
        filters={{ role }}
      />
    </>
  );
};

export default UsersPage;
