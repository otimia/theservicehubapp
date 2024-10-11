import Typography from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Params = {
    adminId: string
}

export default function Page({ params }: { params: Params }) {
console.log(params)
    return <div className='flex flex-col h-full w-full '>
        <div className='flex flex-row justify-between pt-2 pl-2 h-1/8 mb-5'>
            <div className='flex flex-col'>
                <Typography variant='h3' className='mb-[-10px]'>  Workspace</Typography>
                 <Typography variant='p' className='text-muted-foreground'>Choose your workspace</Typography>
            </div>
            <Button><PlusCircleIcon className='mr-2'/>Add Workspace</Button>
           
        </div>
        <div className='flex flex-row gap-4'>
            <Card className='flex flex-col w-[250px] cursor-pointer h-[150px]'>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription className='text-black font-bold'>Pro <span className='text-muted-foreground font-normal'>plan</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
            <Card className='flex flex-col w-[250px] h-[150px]'>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
        </div>
        <div className='flex flex-row justify-center items-center h-full'>
            <Card className='flex flex-col justify-center items-center w-[500px] h-[300px]'>
                <CardHeader className='flex flex-col justify-center items-center'>
                    <Image src='/folder_13543330.png' alt='logo' width={100} height={100} />
                    <CardTitle>Workspace</CardTitle>
                    <CardDescription>Choose your workspace</CardDescription>
                    <CardContent className='pt-4'>
                        <Button>Create Workspace</Button>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    </div>
}
    