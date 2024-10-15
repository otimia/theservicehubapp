import { getAdmin } from '@/actions/admin/actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createAdmin } from '@/actions/admin/actions'



async function AdminPage() {
    const user = await currentUser()
    if (!user) {
        return redirect('/sign-in')
    }
    const admin = await getAdmin()

    if (admin === null) {
        const createdAdmin = await createAdmin({ userId: user?.id as string })
        return redirect(`/admin/${createdAdmin?.id}/onboarding`)
    }

    return redirect(`/admin/${admin?.dbAdmin?.id}/workspace`)
}

export default AdminPage

