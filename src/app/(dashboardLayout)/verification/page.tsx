import VerificationTable from "@/components/page/verification/VerificationTable";
import { demoUsersData } from "@/demoData/users";
const VerificationPage = async ({ searchParams }) => {
  const { role } = await searchParams;
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
      <VerificationTable
        users={demoUsersData as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ role }}
      />
    </>
  );
};

export default VerificationPage;
