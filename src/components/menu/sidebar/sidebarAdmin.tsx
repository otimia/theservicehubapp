"use client"
import React from 'react'
import MenuItem, { SubMenuItem } from './menuItem';
import { Home, Users, Package, CircleUser } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const dummyMenuItems = [
    {
        label: "Workspace",
        value: "workspace",
        href: "workspace",
        icon: Home,
        submenu: [
            { label: "Submenu Item 1.1", value: "value1.1", href: "#" },
            { label: "Submenu Item 1.2", value: "value1.2", href: "#" },
        ],
    },
    {
        label: "Members",
        value: "members",
        href: "members",
        icon: Users,
        submenu: [
            { label: "Submenu Item 2.1", value: "value2.1", href: "#" },
        ],
    },
    {
        label: "Billing",
        value: "billing",
        href: "billing",
        icon: Package,
        submenu: [
            { label: "Submenu Item 3.1", value: "value3.1", href: "#" },
            { label: "Submenu Item 3.2", value: "value3.2", href: "#" },
            { label: "Submenu Item 3.3", value: "value3.3", href: "#" },
        ],
    },
    {
        label: "Settings",
        value: "settings",
        href: "settings",
        icon: CircleUser,
        submenu: [
            { label: "Profile", value: "profile", href: "settings/profile" },
            { label: "Account", value: "account", href: "settings/account" },
        ],
    },
];

type Params = {
    adminId: string
}

const SidebarAdmin = ({ adminId }: Params) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className='' >
            <ul className=''>
                {dummyMenuItems?.map((item, index) => (
                    <MenuItem className={(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) ? 'bg-muted text-primary mb-2' : ''} key={index} menuItem={[item]} onClick={() => { router.push(`/admin/${adminId}/${item.value}`) }} >
                        {(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) && <SubMenuItem route='admin' submenu={item.submenu} workspaceId={adminId} itemValue={item.value} />}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}

export default SidebarAdmin