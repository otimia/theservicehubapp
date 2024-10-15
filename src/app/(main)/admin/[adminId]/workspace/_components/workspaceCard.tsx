'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Subscription, Workspace } from "@prisma/client";
import { useRouter } from "next/navigation";
import PlanBadge from "./planBadge";

type WorkspaceProps = {
    workspace: Workspace
    subscription: Subscription
}

export function WorkspaceCard({ workspace, subscription }: WorkspaceProps) {
    const router = useRouter()

    return <div>
        <Card key={workspace.id} onClick={() => {
            localStorage.setItem('workspaceId', workspace.id);
            router.push(`/workspace/${workspace.id}`);
        }}
            className="cursor-pointer">
            <CardHeader>
                <CardTitle>{workspace.name}</CardTitle>
                <CardDescription>{workspace.createdAt.toDateString()}</CardDescription>
                <PlanBadge subscription={subscription} />
            </CardHeader>
            <CardContent>
                <p>Workspace Content</p>
            </CardContent>
        </Card>
    </div >
}