'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { createWorkspace } from '@/actions/workspace/actions'
import { SubscriptionType } from '@prisma/client'
type Props = {
    adminId: string
}

const workspaceSchema = z.object({
    name: z.string().min(1),
    adminId: z.string().min(1),
    subscription: z.string().optional(),
    description: z.string().optional(),
})


export default function CreateWorkspace(props: Props) {
    const router = useRouter()
    const form = useForm<z.infer<typeof workspaceSchema>>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: '',
            adminId: props.adminId,
            subscription: 'free' as SubscriptionType,
        },
    })

    const onSubmit = async (values: z.infer<typeof workspaceSchema>) => {
        const newWorkspace = await createWorkspace(
            {
                name: values.name,
                adminId: values.adminId,
                subscription: values.subscription as SubscriptionType,
            }
        )
        console.log("newWorkspace", newWorkspace)
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>s
                            <FormDescription>
                                This is the name of the workspace
                            </FormDescription>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={form.formState.isSubmitting} className='w-full' type="submit">Create Workspace</Button>
            </form>
        </Form>
    )
}