import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreHorizontal } from "lucide-react";
import { useOpenEditRuko } from "../hooks/use-open-edit-dialog";
import { useDeleteRuko } from "../api/use-delete-ruko";

// export type Menu = {
//     id: string;
//     // price: number;
//     // author: string;
//     // status: string
//     name: string;
//     price: number;
//   };

export const ActionCell = ({ ruko }: { ruko: any }) => {
    const { onOpen } = useOpenEditRuko(); // Hook can be used here
    const deleteMutation = useDeleteRuko(ruko.id!);
    const [DialogConfirm, Confirm] = useConfirm("Apakah Anda yakin?", "Anda akan menghapus data ruko ini");
  
    const handleDeleteMenu = async () => {
      const ok = await Confirm();
      if (ok) {
        deleteMutation.mutate();
      }
      return null;
    };
  
    return (
      <>
        <DialogConfirm />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka Ruko</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ruko.id)}>Salin ID menu ini</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen(ruko.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteMenu}>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  };