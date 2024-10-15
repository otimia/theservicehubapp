'use client'
import Image from 'next/image'
import React from 'react'
import { useTheme } from 'next-themes'

type LogoVariant = 'light' | 'dark' | 'auto'

interface LogoProps {
    variant?: LogoVariant
}

export default function Logo({ variant = 'auto' }: LogoProps) {
    const { resolvedTheme } = useTheme()

    const getLogoSrc = () => {
        if (variant === 'dark') return "/TSH_logo_black.svg"
        if (variant === 'light') return "/TSH_logo_white.svg"
        return resolvedTheme === 'dark' ? "/TSH_logo_white.svg" : "/TSH_logo_black.svg"
    }

    return (
        <div>
            <Image
                src={getLogoSrc()}
                alt="logo"
                width={100}
                height={100}
            />
        </div>
    )
}