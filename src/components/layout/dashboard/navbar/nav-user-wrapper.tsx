import { NavUser } from "./nav-user";
import { myFetch } from "@/utils/myFetch";

const NavUserWrapper = async () => {
  const res = await myFetch("/user/profile", {
    tags: ["profile"],
  });

  return <NavUser user={res?.data} />;
};

export default NavUserWrapper;
