'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export const OrganizationPicker = () => {
    const router = useRouter()
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    })
    const { organization } = useOrganization()

    if (!isLoaded) {
        return <p>Loading</p>
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-3 gap-4'>
                {
                    userMemberships.data?.map((mem) => (
                        <Card
                            key={mem.id}
                            onClick={() => {
                                setActive({ organization: mem.organization.id });
                                // Redirect naar een andere pagina na het instellen van de actieve organisatie
                                router.push(`/workspace/${mem.organization.id}`); // Vervang '/path/to/redirect' door de gewenste URL
                            }}
                            className='cursor-pointer'
                        >
                            <CardHeader>
                                <CardTitle>{mem.organization.name}</CardTitle>
                                <CardDescription>{mem.organization.slug}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
            <p >
                {organization?.name}
            </p>
            {userMemberships.hasNextPage && (
                <button disabled={!userMemberships.hasNextPage} onClick={() => userMemberships.fetchNext()}>
                    Load more organizations
                </button>
            )}
        </div>
    )
}
