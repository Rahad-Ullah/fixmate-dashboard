/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGE_URL } from "@/config/env-config";
import { myFetch } from "@/utils/myFetch";
import { CircleCheckBig, File, Luggage, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserDetails = ({ id }: { id: string }) => {
  const [userData, setUserData] = useState<any>(null);

  // fetch user details
  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch(`/admin/users/${id}`);
      setUserData(res?.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-8 border-b pb-4">
        <figure>
          <Image
            src={
              userData?.image ? `${IMAGE_URL}${userData?.image}` : "/avatar.png"
            }
            alt="avatar"
            width={150}
            height={150}
            className={`rounded-full aspect-square object-cover ${
              userData?.role === "PROVIDER" ? "w-32 h-32" : "w-24 h-24"
            }`}
          />
        </figure>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              {userData?.name || "Unknown"}
            </h1>
            <h3 className="text-lg font-medium">
              {userData?.category || "Unknown"}
            </h3>
          </div>
          {/* experience overview for provider only */}
          {userData?.role === "PROVIDER" && (
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex items-center gap-4 p-4 px-6 pl-0 border-r">
                <Luggage size={28} strokeWidth={1.5} className="text-primary" />
                <h4>
                  <span className="font-semibold">
                    {userData?.experience || "0 Year"}
                  </span>
                  <br /> Experience
                </h4>
              </div>
              <div className="flex items-center gap-4 p-4 px-6 border-r">
                <CircleCheckBig
                  size={28}
                  strokeWidth={2}
                  className="text-primary"
                />
                <h4>
                  <span className="font-semibold">
                    {userData?.totalDoneWork || "0"}
                  </span>
                  <br /> Task Done
                </h4>
              </div>
              <div className="flex items-center gap-4 p-4 px-6">
                <Star size={28} strokeWidth={1.5} className="text-primary" />
                <h4>
                  <span className="font-semibold">
                    {userData?.review || "0"}
                  </span>
                  <br /> Review
                </h4>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* work overview for provider only */}
      {userData?.role === "PROVIDER" && (
        <section className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="text-xl text-center">
              Completed Work <br />
              <span className="text-2xl font-semibold text-[#008F37]">
                {userData?.completedWork || "0"}
              </span>
            </h4>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="text-xl text-center">
              Upcoming Work <br />
              <span className="text-2xl font-semibold text-[#F48201]">
                {userData?.upCommingWork || "0"}
              </span>
            </h4>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="text-xl text-center">
              Cancel Work <br />
              <span className="text-2xl font-semibold text-[#EB0000]">
                {userData?.cancelWork || "0"}
              </span>
            </h4>
          </div>
        </section>
      )}
      <section
        className={`grid ${
          userData?.role === "PROVIDER" && "md:grid-cols-2"
        } gap-4`}
      >
        <div className="grid gap-4 h-fit">
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3 border-b capitalize">
              Gender <span>{userData?.gender?.toLowerCase() || "Unknown"}</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Date of Birth <span>{userData?.dateOfBirth || "Unknown"}</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3">
              Nationality <span>{userData?.nationality || "Unknown"}</span>
            </p>
          </div>
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Mobile <span>{userData?.contact || "Unknown"}</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Whatsapp <span>{userData?.whatsapp || "Unknown"}</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3">
              E-mail <span>{userData?.email || "Unknown"}</span>
            </p>
          </div>
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3">
              Address
              <span className="text-right">
                {userData?.address || "Unknown"}
              </span>
            </p>
          </div>
        </div>
        {/* work overview for provider only */}
        {userData?.role === "PROVIDER" && (
          <div className="grid gap-4 h-fit">
            <div className="bg-white p-2 px-3 rounded-lg shadow-md">
              <p className="flex justify-between items-center gap-4 py-3 border-b">
                Expertise <span>{userData?.expertise || "Unknown"}</span>
              </p>
              <p className="flex justify-between items-center gap-4 py-3 border-b">
                Country <span>{userData?.country || "Unknown"}</span>
              </p>
              <p className="flex justify-between items-center gap-4 py-3 border-b">
                Service Area <span>{userData?.serviceArea || "Unknown"}</span>
              </p>
              <p className="flex justify-between items-center gap-4 py-3 border-b">
                Service Distance (km)
                <span>{userData?.serviceDistance || "Unknown"}</span>
              </p>
              <p className="flex justify-between items-center gap-4 py-3 border-b">
                Available Days
                <span className="capitalize">
                  {userData?.availableDay
                    ?.map((day) => day.toLowerCase())
                    .join(", ") || "Unknown"}
                </span>
              </p>
              <p className="flex justify-between items-center gap-4 py-3">
                Available Time{" "}
                <span>
                  {`${userData?.availableTime?.startTime} - ${userData?.availableTime?.endTime}` ||
                    "Unknown"}
                </span>
              </p>
            </div>
            <div className="bg-white p-2 px-3 rounded-lg shadow-md">
              <p>
                <span className="font-semibold">Overview:</span> <br />{" "}
                <span className="text-sm">
                  {userData?.overview || "Unknown"}
                </span>
              </p>
            </div>
            {/* licenses files */}
            {userData?.licenses?.length > 0 &&
              userData?.licenses?.map((license: string, idx: number) => (
                <div key={idx} className="bg-white p-3 rounded-lg shadow-md">
                  <p className="flex justify-between items-center gap-4">
                    <span>{license || "Unknown"}</span>
                    <File className="text-red-500" />
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDetails;
