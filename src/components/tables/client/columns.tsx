"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DropdownForm from "./dropdown"
import { ArrowUpDown } from "lucide-react"
import { ClientStatus } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Clients = {
    id: string
    status: ClientStatus
    email: string
    name: string
    orgId: string
    // Voeg andere velden toe die je nodig hebt
}



export const columns: ColumnDef<Clients>[] = [ // Verander hier de type definitie
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount")) || 0 // Zorg ervoor dat amount een geldig nummer is
            const formatted = new Intl.NumberFormat("nl", {
                style: "currency",
                currency: "EUR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>

        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    <DropdownForm serviceId={payment.id} workspaceId={payment.orgId} />
                </div>
            )
        },

    },
]