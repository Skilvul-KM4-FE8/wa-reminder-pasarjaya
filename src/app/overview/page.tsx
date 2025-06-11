import { Card } from "@/components/ui/card";
import { Header } from "../components/header";
import ChartBarHorizontal from "@/app/components/mollecules/bar-chart-horizontal";
import { ChartBarActive } from "../components/mollecules/chart-bar-active";
export default function OverviewPage() {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center max-w-screen-2xl w-full pb-10 -mt-29 px-2 lg:px-14">
        <Card className="w-full border-none bg-white drop-shadow-sm p-6">
          <p className="text-2xl font-bold ">Pembayaran Ruko</p>
          <p className="text-lg">Jumlah ruko yang sudah bayar</p>
          <ChartBarHorizontal />
          <ChartBarActive />
        </Card>
      </div>
    </>
  );
}
