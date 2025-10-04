import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

const ProfileDetailsTab = ({ user }) => {
  return (
    <>
      {/* body */}
      <section className="flex flex-col gap-10 justify-between h-full max-w-2xl p-10 border rounded-lg">
        <div className="flex justify-end">
          <EditProfileModal user={user} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={user.image || "/avatar.png"}
            alt="profile"
            width={200}
            height={200}
            priority
            className="rounded-full max-w-56 aspect-square object-cover"
          />
        </div>
        <div className="grid grid-cols-2 w-full max-w-3xl gap-6">
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Name</p>
            <p className="text-[#5C5C5C] capitalize">
              {user.firstName || "Unknown"} {user.lastName}
            </p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Email</p>
            <p className="text-[#5C5C5C]">{user.email}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Phone No</p>
            <p className="text-[#5C5C5C]">{user.phone || "Unknown"}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Gender</p>
            <p className="text-[#5C5C5C] capitalize">
              {user.gender?.toLowerCase() || "Unknown"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileDetailsTab;
