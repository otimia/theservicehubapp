"use client"
import React from 'react'
import MenuItem, { SubMenuItem } from './menuItem';
import { Home, Users, Package, ShoppingCart, LineChart, CircleUser } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const dummyMenuItems = [
    {
        label: "Menu Item 1",
        value: "dashboard",
        href: "dashboard",
        icon: Home,
        submenu: [
            { label: "Submenu Item 1.1", value: "value1.1", href: "#" },
            { label: "Submenu Item 1.2", value: "value1.2", href: "#" },
        ],
    },
    {
        label: "Menu Item 2",
        value: "value2",
        href: "#",
        icon: Users,
        submenu: [
            { label: "Submenu Item 2.1", value: "value2.1", href: "#" },
        ],
    },
    {
        label: "Menu Item 3",
        value: "value3",
        href: "#",
        icon: Package,
        submenu: [
            { label: "Submenu Item 3.1", value: "value3.1", href: "#" },
            { label: "Submenu Item 3.2", value: "value3.2", href: "#" },
            { label: "Submenu Item 3.3", value: "value3.3", href: "#" },
        ],
    },
    {
        label: "Menu Item 4",
        value: "value4",
        href: "#",
        icon: ShoppingCart,
        submenu: [
            { label: "Submenu Item 4.1", value: "value4.1", href: "#" },
        ],
    },
    {
        label: "Menu Item 5",
        value: "value5",
        href: "#",
        icon: LineChart,
        submenu: [
            { label: "Submenu Item 5.1", value: "value5.1", href: "#" },
            { label: "Submenu Item 5.2", value: "value5.2", href: "#" },
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
    workspaceId: string
}

const Sidebar = ({ workspaceId }: Params) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className='' >
            <ul className=''>
                {dummyMenuItems?.map((item, index) => (
                    <MenuItem className={(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) ? 'bg-muted text-primary mb-2' : ''} key={index} menuItem={[item]} onClick={() => { router.push(`/workspace/${workspaceId}/${item.value}`) }} >
                        {(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) && <SubMenuItem submenu={item.submenu} workspaceId={workspaceId} itemValue={item.value} />}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar