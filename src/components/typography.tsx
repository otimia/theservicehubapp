import React from 'react'
import { cn } from "@/lib/utils"

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'blockquote' | 'a' | 'ul' | 'ol' | 'li' | 'table'

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    variant?: TypographyTag;
    as?: TypographyTag;
}

const variantStyles: Record<TypographyTag, string> = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    a: "font-medium text-primary underline underline-offset-4",
    ul: "my-6 ml-6 list-disc [&>li]:mt-2",
    ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
    li: "mt-2",
    table: "my-6 w-full overflow-y-auto",
}

export function Typography({ children, className, variant = 'p', as }: TypographyProps) {
    const Component = as || variant
    return (
        <Component className={cn(variantStyles[variant], className)}>
            {children}
        </Component>
    )
}

export default Typography

interface TypographyTableProps {
    headers: string[]
    rows: string[][]
    className?: string
}

export function TypographyTable({ headers, rows, className }: TypographyTableProps) {
    return (
        <div className={cn(variantStyles.table, className)}>
            <table className="w-full">
                <thead>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                        {headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="m-0 border-t p-0 even:bg-muted">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface TypographyListProps {
    items: string[]
    className?: string
    ordered?: boolean
}

export function TypographyList({ items, className, ordered = false }: TypographyListProps) {
    const ListComponent = ordered ? 'ol' : 'ul'
    return (
        <ListComponent className={cn(variantStyles[ordered ? 'ol' : 'ul'], className)}>
            {items.map((item, index) => (
                <li key={index} className={variantStyles.li}>{item}</li>
            ))}
        </ListComponent>
    )
}