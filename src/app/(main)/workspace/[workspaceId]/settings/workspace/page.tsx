import { Separator } from "@/components/ui/separator"
import UpdateOrganization from "./account-form"

export default async function SettingsAccountPage() {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Workspace</h3>
                <p className="text-sm text-muted-foreground">
                    Update your workspace settings. Set your preferred language and
                    timezone.
                </p>
            </div>
            <Separator />
            <UpdateOrganization />
        </div>
    )
}