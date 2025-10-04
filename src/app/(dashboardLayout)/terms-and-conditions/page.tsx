import TermsAndConditions from "@/components/page/terms-and-conditions/TermsAndConditions";
import { myFetch } from "@/utils/myFetch";

const TermsAndConditionsPage = async () => {
  const res = await myFetch("/admin/terms", { tags: ["terms"] });

  return (
    <>
      <TermsAndConditions defaultContent={res?.data?.content}/>
    </>
  );
};

export default TermsAndConditionsPage;
