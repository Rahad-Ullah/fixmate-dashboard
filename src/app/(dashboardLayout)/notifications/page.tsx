import PageTitle from "@/components/shared/PageTitle";
import { Bell } from "lucide-react";

const NotificationPage = () => {
  return (
    <div className="flex flex-col gap-6 px-4">
      <section>
        <PageTitle>Notifications</PageTitle>
      </section>
      <section className="grid gap-4">
        <div className="flex justify-between items-center gap-4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex gap-4">
            <span className="p-4 bg-secondary-foreground rounded-lg w-fit">
              <Bell />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-secondary">
                Service Confirmation
              </h1>
              <p className="text-[#707070]">
                Order Confirmation: Your booking with John Doe is confirmed!
                Service will start at 10:00 AM.
              </p>
            </div>
          </div>
          <p className="text-[#707070]">3 hours ago</p>
        </div>
        <div className="flex justify-between items-center gap-4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex gap-4">
            <span className="p-4 bg-secondary-foreground rounded-lg w-fit">
              <Bell />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-secondary">
                Service Reminder
              </h1>
              <p className="text-[#707070]">
                Reminder: Your scheduled service with John Doe starts in 30
                minutes. Please be prepared.
              </p>
            </div>
          </div>
          <p className="text-[#707070]">3 hours ago</p>
        </div>
        <div className="flex justify-between items-center gap-4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex gap-4">
            <span className="p-4 bg-secondary-foreground rounded-lg w-fit">
              <Bell />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-secondary">
                Service Confirmation
              </h1>
              <p className="text-[#707070]">
                Order Confirmation Your booking with John Doe is confirmed!
                Service will start at 10:00 AM.
              </p>
            </div>
          </div>
          <p className="text-[#707070]">3 hours ago</p>
        </div>
        <div className="flex justify-between items-center gap-4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex gap-4">
            <span className="p-4 bg-secondary-foreground rounded-lg w-fit">
              <Bell />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-secondary">
                Service Reminder
              </h1>
              <p className="text-[#707070]">
                Reminder: Your scheduled service with John Doe starts in 30
                minutes. Please be prepared.
              </p>
            </div>
          </div>
          <p className="text-[#707070]">3 hours ago</p>
        </div>
      </section>
    </div>
  );
};

export default NotificationPage;
