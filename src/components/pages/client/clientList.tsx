import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EditIcon, EllipsisVerticalIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type Props = {
    name: string
    status: string
    email: string
    clerkId: string
}

const ClientList = (props: Props) => {
    return (
        <Card>
            <CardContent className="flex flex-row justify-between items-center gap-2 px-12 py-8">
                <div className="flex flex-col gap-2">
                    <CardTitle>{props.name}</CardTitle>
                    <CardDescription>{props.email}</CardDescription>
                </div>
                <div>
                    <Badge variant={props.status === "active" ? "default" : props.status === "inactive" ? "destructive" : "outline"}>{props.status}</Badge>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <EllipsisVerticalIcon className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <div className="flex flex-row gap-2 items-center cursor-pointer">
                                    <EditIcon className="w-4 h-4" />
                                    <p>Edit</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <div className="flex flex-row gap-2 items-center cursor-pointer">
                                    <TrashIcon className="w-4 h-4" />
                                    <p>Delete</p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClientList