import VerificationTable from "@/components/page/verification/VerificationTable";
import { myFetch } from "@/utils/myFetch";
const VerificationPage = async ({ searchParams }) => {
  const { status, search, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(search && { searchTerm: search }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/verification/all-requests?${queryParams.toString()}`, {
    tags: ["verifications"],
  });
  const verificationRequests = res?.data?.data;

  return (
    <>
      <VerificationTable
        users={verificationRequests || []}
        meta={{ ...res?.data?.meta, totalPage: res?.data?.meta?.totalPage }}
        filters={{ status }}
      />
    </>
  );
};

export default VerificationPage;
