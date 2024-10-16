'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../ui/button'
import AddWorkspaceButton from './addWorkspaceButton'

export const OrganizationSwitcher = () => {
    const organization = useOrganization()
    const router = useRouter()
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    })

    if (!isLoaded) {
        return <p>Loading</p>
    }

    return (
        <div className='flex flex-col w-full h-full mb-4'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className='w-full justify-start pl-3 gap-2'>
                        <Image
                            src={organization.organization?.imageUrl || ''}
                            alt={organization.organization?.name || ''}
                            width={20}
                            height={20}
                            className='rounded-full'
                        />
                        <span className='text-sm font-medium'>
                            {organization.organization?.name}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-full' sideOffset={10} align='start'>
                    {userMemberships.data?.map((mem) => (
                        <DropdownMenuItem
                            className={`flex gap-2 justify-between cursor-pointer${mem.organization.id === organization.organization?.id ? 'font-bold text-indigo-600 hover:bg-stone-950' : ''}`}
                            key={mem.organization.id}
                            onClick={() => {
                                setActive({ organization: mem.organization.id });
                                router.push(`/workspace/${mem.organization.id}`);
                            }}
                        >
                            <div className='flex gap-2'>
                                <Image
                                    src={mem.organization.imageUrl}
                                    alt={mem.organization.name}
                                    width={20}
                                    height={20}
                                    className='rounded-full'
                                />
                                <span>
                                    {mem.organization.name}
                                </span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <AddWorkspaceButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
