
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Subscription } from '@prisma/client'
function PlanBadge({ subscription }: { subscription: Subscription }) {

    return (
        <div>
            <Badge> {subscription.type}</Badge>
        </div>
    )
}

export default PlanBadge