import { Button } from "@/components/ui/button";
import { CircleCheckBig, File, Luggage, Star } from "lucide-react";
import Image from "next/image";

const VerificationDetails = () => {
  return (
    <div className="grid gap-4">
      <section className="flex gap-8 border-b pb-4">
        <figure>
          <Image
            src="/avatar.png"
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full"
          />
        </figure>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Rahad Ullah</h1>
            <h3 className="text-lg font-medium">Electrician</h3>
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

      {/* button section */}
      <section className="flex justify-center gap-4 mt-4">
        <Button variant="destructive" size={"lg"} className="px-16">
          Reject
        </Button>
        <Button
          size={"lg"}
          className="px-14 bg-gradient-to-r from-primary-foreground to-primary"
        >
          Approve
        </Button>
      </section>
    </div>
  );
};

export default VerificationDetails;
