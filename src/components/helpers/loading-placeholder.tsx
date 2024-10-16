import { cn } from "@/lib/utils"

type LoadingPlaceholderProps = {
    variant: 'table' | 'list' | 'card' | 'grid'
    count: 'single' | 'three' | 'grid'
}

const TablePlaceholder = () => (
    <div className="w-full animate-pulse">
        <div className="h-10 bg-muted mb-4 rounded"></div>
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded"></div>
            ))}
        </div>
    </div>
)

const ListPlaceholder = () => (
    <div className="w-full space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
            </div>
        ))}
    </div>
)

const CardPlaceholder = () => (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
        <div className="h-48 bg-muted"></div>
        <div className="px-6 py-4 space-y-2">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
            <div className="h-8 bg-muted rounded w-24 inline-block mr-2"></div>
            <div className="h-8 bg-muted rounded w-24 inline-block"></div>
        </div>
    </div>
)

const GridPlaceholder = () => (
    <div className="w-full h-48 bg-muted rounded animate-pulse"></div>
)

export default function LoadingPlaceholder({ variant, count }: LoadingPlaceholderProps) {
    const Placeholder = {
        table: TablePlaceholder,
        list: ListPlaceholder,
        card: CardPlaceholder,
        grid: GridPlaceholder
    }[variant]

    const wrapperClasses = cn(
        "w-full",
        {
            "space-y-8": count === 'three',
            "grid gap-4": count === 'grid',
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": count === 'grid' && (variant === 'card' || variant === 'grid')
        }
    )

    return (
        <div className={wrapperClasses}>
            {count === 'single' && <Placeholder />}
            {count === 'three' && [...Array(3)].map((_, i) => <Placeholder key={i} />)}
            {count === 'grid' && [...Array(6)].map((_, i) => <Placeholder key={i} />)}
        </div>
    )
}