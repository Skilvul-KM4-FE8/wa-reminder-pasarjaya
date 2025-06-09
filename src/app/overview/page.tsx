import { Header } from "../components/header";

export default function OverviewPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold mb-4">Overview Page</p>
        <p className="text-lg">This is the overview page.</p>
        {/* Add your overview functionality here */}
      </div>
    </>
  );
}
