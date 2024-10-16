import { Metadata } from "next"
import { SidebarNav } from "./components/sidebar-nav"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}


const sidebarNavItems = (workspaceId: string) => [
    {
        title: "Profile",
        href: `/workspace/${workspaceId}/settings`,
    },
    {
        title: "Workspace",
        href: `/workspace/${workspaceId}/settings/workspace`,
    },
    {
        title: "Appearance",
        href: `/workspace/${workspaceId}/settings/appearance`,
    },
    {
        title: "Notifications",
        href: `/workspace/${workspaceId}/settings/notifications`,
    },
    {
        title: "Display",
        href: `/workspace/${workspaceId}/settings/display`,
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
    params: { workspaceId: string }
}

export default function SettingsLayout({ children, params }: SettingsLayoutProps) {
    return (
        <>
            <div className="flex flex-col p-4 md:flex-row md:space-x-12 md:space-y-0 w-full">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems(params.workspaceId)} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </>
    )
}
