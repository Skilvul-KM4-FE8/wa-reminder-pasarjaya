"use client";
// import { columns } from "@/app/(menu)/columns";
// import { DataTable } from "@/app/(menu)/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetMenus } from "@/features/menu/api/use-get-menus";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRukos } from "../utils/useGetRuko";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAddRuko } from "@/features/customer/hooks/use-add-dialog";
import { SendCustomerModal } from "@/features/broadcast/components /SendCustomerModal";

// import { useBulkDeleteMenus } from "@/features/menu/api/use-bulk-delete-menus";
// import useBuyDialog from "@/features/transaction/hooks/use-buy-dialog";

export default function MenuPage() {
  // const menuQuery = useGetMenus();
  // const { data, isLoading, error, isPending } = useGetRuko();
  const rukoQuery = useGetRukos();
  const rukoData = rukoQuery.data || [];
  // console.log("Data dari Api:", rukoQuery.data);
  // console.log("Data dari Api:", rukoData.data);
  const { onOpen: isOpenAddDialog } = useAddRuko();
  const { onOpen: isSendWADialog } = useAddRuko();

  // const bulkDeleteMenuMutation = useBulkDeleteMenus();

  const disabled = rukoQuery.isLoading || rukoQuery.isPending;

  if (rukoQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl w-full pb-10 -mt-24 flex justify-center items-center mx-auto">
        <Card className="w-full border-none bg-white drop-shadow-sm">
          <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-10 w-28 lg:w-48" />
            </CardTitle>
            <Skeleton className="h-10 w-full lg:w-36" />
            {/* <Skeleton className="h-10 w-28 md:w-48" /> */}
          </CardHeader>
          <CardContent className="grid gap-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-2/5" />
              <Skeleton className="h-10 w-full lg:w-28" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm bg-white">
        <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Ruko List</CardTitle>
          <Button size="sm" onClick={isOpenAddDialog} disabled={disabled}>
            <Plus className="size-4 mr-2" />
            Tambah Ruko
          </Button>
        </CardHeader>
        <SendCustomerModal />
        <CardContent>
          <DataTable
            columns={columns}
            data={rukoData.map((ruko: any) => ({
              ...ruko,
              quantity: 1,
            }))}
            disabled={disabled}
            // onDelete={(rows) => {
            //   const ids = rows.map((row) => row.original.id);
            //   bulkDeleteMenuMutation.mutate(ids);
            // }}
            onSend={(rows) => {
              const datas = rows.map((row) => ({
                ...row.original,
              }));
              console.log("Data to be sent for buying:", datas);

              datas.map((data) => {
                console.log(`Halo pak/buk ${data.name}, silahkan lakukan pembayaran loker ${data.pasarName} .
                 . pesan ini dikirim ke ${data.phone} .
                  `);
              });
              // isOpenBuyDialog(datas);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
