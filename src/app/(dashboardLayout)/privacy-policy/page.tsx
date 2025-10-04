import PrivacyPolicy from "@/components/page/privacy-policy/PrivacyPolicy";
import { myFetch } from "@/utils/myFetch";

const PrivacyPolicyPage = async () => {
  const res = await myFetch("/admin/policy", { tags: ["policy"] });

  return (
    <>
      <PrivacyPolicy defaultContent={res?.data?.content || ""} />
    </>
  );
};

export default PrivacyPolicyPage;
