import { AddRukoDialog } from "@/features/customer/components/add-ruko-dialog";
import { Header } from "../components/header";
import { EditRukoDialog } from "@/features/customer/components/edit-ruko-dialog";

type DashboardLayoutProps = {
  children : React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <AddRukoDialog />
      <EditRukoDialog />
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>
  )
}

export default DashboardLayout;