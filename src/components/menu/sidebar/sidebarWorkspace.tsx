"use client"
import React from 'react'
import MenuItem, { SubMenuItem } from './menuItem';
import { Home, Users, Package, CalendarClock, CircleUser, Wallet } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const dummyMenuItems = [
    {
        label: "Dashboard",
        value: "dashboard",
        href: "dashboard",
        icon: Home,
        submenu: [
            { label: "Reports", value: "reports", href: "#" },
        ],
    },
    {
        label: "Service",
        value: "service",
        href: "#",
        icon: Package,
        submenu: [
            { label: "Categories", value: "categories", href: "#" },
            { label: "Services", value: "services", href: "#" },
            { label: "Subscriptions", value: "subscriptions", href: "#" },
        ],
    },
    {
        label: "Clients",
        value: "client",
        href: "#",
        icon: Users,
        submenu: [
            { label: "Pipelines", value: "pipelines", href: "#" },
            { label: "Contacts", value: "contacts", href: "#" },
        ],
    },
    {
        label: "Booking",
        value: "booking",
        href: "#",
        icon: CalendarClock,
        submenu: [
            { label: "Bookings", value: "bookings", href: "#" },
            { label: "Calendar", value: "calendar", href: "#" },
            { label: "Widgets", value: "widgets", href: "#" },
        ],
    },
    {
        label: "Finance",
        value: "finance",
        href: "#",
        icon: Wallet,
        submenu: [
            { label: "Invoices", value: "invoices", href: "#" },
            { label: "Quotes", value: "quotes", href: "#" },
            { label: "Payments", value: "payments", href: "#" },
        ],
    },
    {
        label: "Settings",
        value: "settings",
        href: "settings",
        icon: CircleUser,
        submenu: [
            { label: "Profile", value: "", href: "settings" },
            { label: "Workspace", value: "workspace", href: "settings/workspace" },
        ],
    },
];

type Params = {
    workspaceId: string
}

const SidebarWorkspace = ({ workspaceId }: Params) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className='' >
            <ul className=''>
                {dummyMenuItems?.map((item, index) => (
                    <MenuItem className={(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) ? 'bg-muted text-primary mb-2' : ''} key={index} menuItem={[item]} onClick={() => { router.push(`/workspace/${workspaceId}/${item.value}`) }} >
                        {(pathname.endsWith(`/${item.value}`) || pathname.split('/').slice(-2)[0] === item.value) && <SubMenuItem route='workspace' submenu={item.submenu} workspaceId={workspaceId} itemValue={item.value} />}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}

export default SidebarWorkspace