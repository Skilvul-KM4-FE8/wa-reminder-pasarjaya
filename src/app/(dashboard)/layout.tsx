import { AddRukoDialog } from "@/features/customer/components/add-ruko-dialog";
import { Header } from "../components/header";

type DashboardLayoutProps = {
  children : React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <AddRukoDialog />
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>
  )
}

export default DashboardLayout;