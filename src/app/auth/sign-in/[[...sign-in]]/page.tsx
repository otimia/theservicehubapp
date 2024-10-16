'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function SignInPage() {

    const auth = useAuth()
    if (auth.isSignedIn) {
        redirect('/workspace')
    }
    return (
        <div className="flex w-full grow h-screen items-center px-4 justify-center">
            <div>
                <SignIn.Root>
                    <Clerk.Loading>
                        {(isGlobalLoading) => (
                            <>
                                <SignIn.Step name="start">
                                    <Card className="w-full sm:w-96">
                                        <CardHeader>
                                            <CardTitle>Sign in to The Service Hub</CardTitle>
                                            <CardDescription>Welcome back! Please sign in to continue</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <div className="grid grid-cols-3 gap-y-2 gap-x-2">
                                                <Clerk.Connection name="google" asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        type="button"
                                                        disabled={isGlobalLoading}
                                                    >
                                                        <Clerk.Loading scope="provider:google">
                                                            {(isLoading) =>
                                                                isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Icons.google className="mr-2 size-4" />
                                                                        Google
                                                                    </>
                                                                )
                                                            }
                                                        </Clerk.Loading>
                                                    </Button>
                                                </Clerk.Connection>
                                                <Clerk.Connection name="apple" asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        type="button"
                                                        disabled={isGlobalLoading}
                                                    >
                                                        <Clerk.Loading scope="provider:apple">
                                                            {(isLoading) =>
                                                                isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Icons.apple className="mr-2 size-4" />
                                                                        Apple
                                                                    </>
                                                                )
                                                            }
                                                        </Clerk.Loading>
                                                    </Button>
                                                </Clerk.Connection>
                                                <Clerk.Connection name="microsoft" asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        type="button"
                                                        disabled={isGlobalLoading}
                                                    >
                                                        <Clerk.Loading scope="provider:microsoft">
                                                            {(isLoading) =>
                                                                isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Icons.microsoft className="mr-2 size-4" />
                                                                        Microsoft
                                                                    </>
                                                                )
                                                            }
                                                        </Clerk.Loading>
                                                    </Button>
                                                </Clerk.Connection>
                                            </div>
                                            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                                or
                                            </p>
                                            <Clerk.Field name="identifier" className="space-y-2">
                                                <Clerk.Label asChild>
                                                    <Label>Email address</Label>
                                                </Clerk.Label>
                                                <Clerk.Input type="email" required asChild>
                                                    <Input />
                                                </Clerk.Input>
                                                <Clerk.FieldError className="block text-sm text-destructive" />
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    'Continue'
                                                                )
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>

                                                <Button variant="link" size="sm" asChild>
                                                    <Link href="/auth/sign-up">Don&apos;t have an account? Sign up</Link>
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Step>
                            </>
                        )}
                    </Clerk.Loading>
                </SignIn.Root>
            </div>
        </div>
    )
}