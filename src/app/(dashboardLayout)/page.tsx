import StatCard from "@/components/page/analytics/cards/StatCard";
import { Card } from "@/components/ui/card";
import stateIcon_1 from "@/assets/icons/state-icon-1.svg";
import stateIcon_2 from "@/assets/icons/state-icon-2.svg";
import stateIcon_3 from "@/assets/icons/state-icon-3.svg";
import stateIcon_4 from "@/assets/icons/state-icon-4.svg";
import { EarningChart } from "@/components/page/analytics/charts/EarningChart";
import TopServiceProviders from "@/components/page/analytics/cards/TopServiceProviders";
import { UserGrowthChart } from "@/components/page/analytics/charts/UserGrowthChart";

const AnalyticsPage = () => {
  return (
    <Card className="h-full bg-transparent border-none animate-fadeIn flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="24,521" icon={stateIcon_1} />
        <StatCard title="Total Provider" value="570" icon={stateIcon_2} />
        <StatCard title="Upcoming Order" value="250" icon={stateIcon_3} />
        <StatCard title="Total Revenue" value="$50,000" icon={stateIcon_4} />
      </div>

      <div className="grid grid-cols-[70%_auto] gap-6">
        <EarningChart />
        <TopServiceProviders />
      </div>

      <UserGrowthChart />
    </Card>
  );
};

export default AnalyticsPage;
