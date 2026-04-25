import Settings from "@/components/page/settings/Settings";
import { myFetch } from "@/utils/myFetch";

const SettingsPage = async () => {
  const res = await myFetch("/settings", { tags: ["settings"] });

  return (
    <>
      <Settings defaultSettings={res?.data || { isSubscribeActive: false }} />
    </>
  );
};

export default SettingsPage;
