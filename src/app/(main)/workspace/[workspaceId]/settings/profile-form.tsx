"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
    id: z.string(),
    username: z.string().min(2, "Username must be at least 2 characters.").max(30),
    firstName: z.string().max(160).min(4),
    lastName: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
    user: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
    };
};

export function ProfileForm({ user }: ProfileFormProps) {
    const router = useRouter();


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: user,  // Use user object with plain values
        mode: "onChange",
    });

    async function onSubmit(data: ProfileFormValues) {
        try {
            // Call server action
            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }),
            });

            if (!response.ok) {
                // Handle error
                console.error('Failed to update user');
                return;
            }

            const result = await response.json();
            toast({
                variant: "default",
                title: "Success",
                description: "Your profile has been updated." + result.user.firstName,
            });
            router.refresh();
            console.log('User updated successfully:', result);
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error updating your profile.",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem
                            className="hidden">
                            <FormLabel>ID</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    );
}
