/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "@/components/page/analytics/cards/StatCard";
import { Card } from "@/components/ui/card";
import stateIcon_1 from "@/assets/icons/state-icon-1.svg";
import stateIcon_2 from "@/assets/icons/state-icon-2.svg";
import stateIcon_3 from "@/assets/icons/state-icon-3.svg";
import stateIcon_4 from "@/assets/icons/state-icon-4.svg";
import { EarningChart } from "@/components/page/analytics/charts/EarningChart";
import TopServiceProviders from "@/components/page/analytics/cards/TopServiceProviders";
import { myFetch } from "@/utils/myFetch";
import RecentBookings from "@/components/page/analytics/cards/RecentBookings";

const AnalyticsPage = async ({ searchParams }: { searchParams: any }) => {
  const { year } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(year && { year }),
  });

  const res = await myFetch(`/admin/overview?${queryParams.toString()}`, {
    cache: "no-store",
  });
  const overview = res?.data;
  const recentBookings = res?.data?.recentServices;

  return (
    <Card className="h-full bg-transparent border-none animate-fadeIn flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={overview?.totalUsers || 0}
          icon={stateIcon_1}
        />
        <StatCard
          title="Total Provider"
          value={overview?.totalProviders || 0}
          icon={stateIcon_2}
        />
        <StatCard
          title="Upcoming Order"
          value={overview?.upCommingOrders || 0}
          icon={stateIcon_3}
        />
        <StatCard
          title="Total Revenue"
          value={overview?.totalRevenue || 0}
          icon={stateIcon_4}
        />
      </div>

      <div className="grid grid-cols-[70%_auto] gap-6">
        <EarningChart data={overview?.monthlyEarning || []} />
        <TopServiceProviders users={overview?.topProviders || []} />
      </div>

      {/* <UserGrowthChart /> */}
      <RecentBookings data={recentBookings || []} />
    </Card>
  );
};

export default AnalyticsPage;
