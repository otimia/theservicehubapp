'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useOrganization } from '@clerk/nextjs'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'


const createWorkspaceSchema = z.object({
    name: z.string().min(3),
})

export default function CreateOrganization() {
    const { createOrganization } = useOrganizationList()
    const [organizationName, setOrganizationName] = useState('')
    const router = useRouter()
    const orgId = useOrganization()

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: '',
        },
    })
    const onSubmit = (data: z.infer<typeof createWorkspaceSchema>) => {
        createOrganization?.({ name: data.name })
        setOrganizationName('')

        router.push(`/workspace/${orgId.organization?.id}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>
                    <Label>Organization name</Label>
                    <Input {...form.register('name')}
                        type="text"
                        name="name"
                        value={organizationName || ""}
                        onChange={(e) => setOrganizationName(e.currentTarget.value)}
                    />
                    <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? "Creating..." : "Create organization"}</Button>
                </div>
            </form>
        </Form>
    )
}