import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getUser } from "@/actions/clerk/user/actions";

export default async function SettingsProfilePage() {
    const { userData } = await getUser();  // Get only serializable user data

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            {/* Pass only plain userData object */}
            <ProfileForm user={userData} />
        </div>
    );
}
