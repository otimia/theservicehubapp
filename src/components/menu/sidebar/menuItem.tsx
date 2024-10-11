"use client"
import { cn } from "@/lib/utils"
import { Dot, LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

type Props = {
    menuItem: {
        label: string
        value: string
        icon?: LucideIcon | undefined
    }[]
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

type SubMenuItemProps = {
    submenu: {
        label: string
        value: string
        href: string
    }[]
    onClick?: () => void
    className?: string
    workspaceId: string
    itemValue: string
}

export default function MenuItem(props: Props) {
    const pathname = usePathname()
    return <div>
        {props.menuItem.map((item, index) => (
            <div key={index} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer", item.value === pathname ? "bg-muted text-primary" : "", props.className)} onClick={props.onClick}>
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
            </div>
        ))}
        <div className="">{props.children}</div>
    </div>
}

export function SubMenuItem({ submenu, className, workspaceId, itemValue }: SubMenuItemProps) {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div>
            {submenu?.map((item, index) => (
                <div key={index} className={cn("flex items-center gap-3 rounded-lg px-3 pb-2 text-muted-foreground transition-all hover:text-primary cursor-pointer",  pathname.endsWith(`/${item.value}`) ? "bg-muted text-primary" : "", className)} onClick={() => { router.push(`/workspace/${workspaceId}/${itemValue}/${item.value}`) }}>
                    <Dot className="w-4 h-4" />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    )
}




