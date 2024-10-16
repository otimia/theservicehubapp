'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Protect, useOrganization } from '@clerk/nextjs'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const createWorkspaceSchema = z.object({
    name: z.string().min(1),
})

export default function UpdateOrganization() {
    const [name, setName] = useState('')
    const router = useRouter()
    const { organization } = useOrganization()

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: '',
        },
    })

    useEffect(() => {
        if (!organization) {
            return
        }
        setName(organization.name)
    }, [organization])

    if (!organization) {
        return null
    }

    async function submit(data: z.infer<typeof createWorkspaceSchema>) {
        try {
            await organization?.update({ name: data.name })
            router.push(`/organizations/${organization?.id}`)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1>Update the current organization</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <div className='flex flex-col gap-2 mb-4'>
                        <Label htmlFor="name">Name</Label>
                        <Protect
                            role='org:admin'
                            fallback={
                                <Input value={name} placeholder='Organization Name' disabled />
                            }>
                            <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Protect>
                    </div>
                    <Protect
                        role='org:admin'>
                        <Button type="submit">Update</Button>
                    </Protect>
                </form>
            </Form>
        </div>
    )
}