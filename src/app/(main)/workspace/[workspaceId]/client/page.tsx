
import React, { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import RefreshBtn from "@/components/ui/refresh-btn"
import { getOrgClients } from '@/actions/client/actions'
import LoadingPlaceholder from '@/components/helpers/loading-placeholder'
import Link from 'next/link'
import ClientList from '@/components/pages/client/clientList'


type Params = {
    workspaceId: string
}

export default async function ClientPage({ params }: { params: Params }) {

    const data = await getOrgClients(params.workspaceId as string)
    return (
        <main className="flex flex-col w-full gap-4 justify-between items-start">
            <div className="flex flex-col w-full gap-4 justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">Clients</h1>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4 justify-between items-start">
                <div className="flex flex-col w-full">
                    <Suspense fallback={<LoadingPlaceholder variant="table" count="single" />}>
                        <div className="flex flex-row w-full items-start justify-between gap-4 mb-4">
                            <RefreshBtn icon="refresh-ccw" variant="outline" />
                            <Button asChild>
                                <Link href={`/workspace/${params.workspaceId}/client/create`}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Client
                                </Link>
                            </Button>
                        </div>
                        {data.map((client) => (
                            <ClientList key={client.id} name={client.name} status={client.status} email={client.email} clerkId={client.clerkId} />
                        ))}
                    </Suspense>
                </div>
            </div>
        </main>
    )
}

