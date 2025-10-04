/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGE_URL } from "@/config/env-config";
import { myFetch } from "@/utils/myFetch";
import { CircleCheckBig, File, Luggage, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserDetails = ({ id }: { id: string }) => {
  const [userData, setUserData] = useState<any>(null);
  console.log(userData);

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
      <section className="flex gap-8 border-b pb-4">
        <figure>
          <Image
            src={
              userData?.image ? `${IMAGE_URL}${userData?.image}` : "/avatar.png"
            }
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full"
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
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex items-center gap-4 p-4 px-6 pl-0 border-r">
              <Luggage size={28} strokeWidth={1.5} className="text-primary" />
              <h4>
                <span className="font-semibold">5+ Years</span> <br />{" "}
                Experience
              </h4>
            </div>
            <div className="flex items-center gap-4 p-4 px-6 border-r">
              <CircleCheckBig
                size={28}
                strokeWidth={2}
                className="text-primary"
              />
              <h4>
                <span className="font-semibold">150+</span> <br /> Task Done
              </h4>
            </div>
            <div className="flex items-center gap-4 p-4 px-6">
              <Star size={28} strokeWidth={1.5} className="text-primary" />
              <h4>
                <span className="font-semibold">4.9</span> <br /> Review
              </h4>
            </div>
          </div>
        </div>
      </section>
      {/* work overview for provider only */}
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h4 className="text-xl text-center">
            Completed Work <br />{" "}
            <span className="text-2xl font-semibold text-[#008F37]">150</span>
          </h4>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h4 className="text-xl text-center">
            Upcoming Work <br />{" "}
            <span className="text-2xl font-semibold text-[#F48201]">150</span>
          </h4>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h4 className="text-xl text-center">
            Cancel Work <br />{" "}
            <span className="text-2xl font-semibold text-[#EB0000]">150</span>
          </h4>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <div className="grid gap-4 h-fit">
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Gender <span>Male</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Date of Birth <span>01 January 2000</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3">
              Nationality <span>African</span>
            </p>
          </div>
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Mobile <span>+99123456789</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Whatsapp <span>+99123456789</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3">
              E-mail <span>example@gmail.com</span>
            </p>
          </div>
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3">
              Address
              <span className="text-right">
                Flat 1204, Al Noor Tower, Sheikh Zayed Road, South Africa.
              </span>
            </p>
          </div>
        </div>
        <div className="grid gap-4 h-fit">
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Expertise <span>Electrician</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Country <span>South Africa</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Service Area <span>Cape Town</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Service Distance <span>20km</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3 border-b">
              Available Days <span>Sat, Sun, Fri</span>
            </p>
            <p className="flex justify-between items-center gap-4 py-3">
              Available Time <span>10am - 6pm</span>
            </p>
          </div>
          <div className="bg-white p-2 px-3 rounded-lg shadow-md">
            <p>
              <span className="font-semibold">Overview:</span> <br />{" "}
              <span className="text-sm">
                I am a certified electrician with over 5 years of proven
                experience handling both residential and commercial electrical
                projects. Throughout my career. installations, troubleshooting,
                repairs, and regular maintenance.
              </span>
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p className="flex justify-between items-center gap-4">
              <span>License.pdf</span>
              <File className="text-red-500" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetails;
