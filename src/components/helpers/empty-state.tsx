import { Button } from "@/components/ui/button"
import {
    ClipboardList,
    CreditCard,
    Search,
    LayoutDashboard,
    Plus,
    RefreshCw,
    Upload
} from "lucide-react"

type EmptyStateProps = {
    variant: 'list' | 'card' | 'search' | 'dashboard'
    title: string
    description: string
    action?: {
        label: string
        onClick: () => void
    }
}

const variantIcons = {
    list: ClipboardList,
    card: CreditCard,
    search: Search,
    dashboard: LayoutDashboard,
}

const variantActions = {
    list: Plus,
    card: RefreshCw,
    search: RefreshCw,
    dashboard: Upload,
}

export default function EmptyState({
    variant,
    title,
    description,
    action
}: EmptyStateProps) {
    const Icon = variantIcons[variant]
    const ActionIcon = variantActions[variant]

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-background border border-border rounded-lg shadow-sm">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                <Icon className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
            {action && (
                <Button onClick={action.onClick} className="flex items-center">
                    <ActionIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {action.label}
                </Button>
            )}
        </div>
    )
}