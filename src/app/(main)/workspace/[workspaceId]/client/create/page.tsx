"use client"
import {
    ChevronLeft,
} from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ClientStatus } from "@prisma/client"
import Opmerkingen from "@/components/helpers/opmerkingen"
import CompanyPicker from "@/components/helpers/company-pickers"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type Params = {
    params: { workspaceId: string }
};

const customerSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    companyId: z.string().optional(),
    status: z.nativeEnum(ClientStatus),
    category: z.string().optional(),
    function: z.string().optional(),
    opmerkingen: z.array(z.string()).optional(),
})

export default function CreateCustomer({ params }: Params) {

    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: "",
            description: "",
            companyId: "",
            status: ClientStatus.active,
            category: "",
            function: "",
            opmerkingen: [],
        },
    })

    const onSubmit = (data: z.infer<typeof customerSchema>) => {
        console.log(data)
    }



    return (
        <div className="flex max-h-[85vh] overflow-y-auto items-start justify-start pb-6 w-full flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <main className="grid flex-1 w-full items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className=" grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <Link href={`/workspace/${params.workspaceId}/customer`}>
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Back</span>
                                    </Link>
                                </Button>
                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Create Customer
                                </h1>


                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card x-chunk="dashboard-07-chunk-0">
                                        <CardHeader>
                                            <CardTitle>Customer Details</CardTitle>
                                            <CardDescription>
                                                Add details to the customer
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem>
                                                                    <FormLabel>Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            id="name"
                                                                            type="text"
                                                                            className="w-full"
                                                                            defaultValue=""
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage />
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem>
                                                                    <FormLabel>Description</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            id="description"
                                                                            className="w-full min-h-32"
                                                                            defaultValue=""
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage />
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-1">
                                        <CardHeader>
                                            <CardTitle>Notes</CardTitle>
                                            <CardDescription>
                                                Add notes to the customer
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Opmerkingen />
                                        </CardContent>

                                    </Card>
                                </div>
                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                    <Card x-chunk="dashboard-07-chunk-3">
                                        <CardHeader>
                                            <CardTitle>Product Status</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name="status"
                                                        defaultValue={ClientStatus.active}
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem>
                                                                    <FormLabel>Status</FormLabel>
                                                                    <FormControl>
                                                                        <Select {...field}>
                                                                            <SelectTrigger id="status" aria-label="Select status">
                                                                                <SelectValue placeholder='Select status' />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value={ClientStatus.active}>Active</SelectItem>
                                                                                <SelectItem value={ClientStatus.inactive}>Inactive</SelectItem>
                                                                                <SelectItem value={ClientStatus.pending}>Pending</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage />
                                                            </>
                                                        )}
                                                    />
                                                    <div className="grid gap-6 pt-3 sm:grid-cols-1">
                                                        <div className="grid gap-3">
                                                            <FormField
                                                                control={form.control}
                                                                name="category"
                                                                render={({ field }) => (
                                                                    <>
                                                                        <FormItem>
                                                                            <FormLabel>Category</FormLabel>
                                                                            <FormControl>
                                                                                <Select {...field}>
                                                                                    <SelectTrigger
                                                                                        id="category"
                                                                                        aria-label="Select category"
                                                                                    >
                                                                                        <SelectValue placeholder="Select category" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="lead">Lead</SelectItem>
                                                                                        <SelectItem value="customer">
                                                                                            Customer
                                                                                        </SelectItem>
                                                                                        <SelectItem value="prospect">
                                                                                            Prospect
                                                                                        </SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    </>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <FormField
                                                                control={form.control}
                                                                name="function"
                                                                render={({ field }) => (
                                                                    <>
                                                                        <FormItem>
                                                                            <FormLabel>Function</FormLabel>
                                                                            <FormControl>
                                                                                <Select {...field}>
                                                                                    <SelectTrigger
                                                                                        id="subcategory"
                                                                                        aria-label="Select subcategory"
                                                                                    >
                                                                                        <SelectValue placeholder="Select subcategory" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="sales">Sales</SelectItem>
                                                                                        <SelectItem value="service">Service</SelectItem>
                                                                                        <SelectItem value="leadership">Leadership</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    </>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card
                                        className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                    >
                                        <CardHeader>
                                            <CardTitle>Company</CardTitle>
                                            <CardDescription>
                                                Select a Company
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="companyId"
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem>
                                                                <FormLabel>Company</FormLabel>
                                                                <FormControl>
                                                                    <CompanyPicker {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-5">
                                        <CardHeader>
                                            <CardTitle>Save Customer</CardTitle>
                                            <CardDescription>
                                                Save the customer to the database
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button type="submit" size="sm">
                                                Save Customer
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button size="sm">Save Customer</Button>
                            </div>
                        </div>
                    </main >
                </form>
            </Form>
        </div >
    )
}
