
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/next"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button asChild variant="outline">
        <Link href="/auth/sign-in">Login</Link>
      </Button>
      <Button asChild>
<SignOutButton />
      <Button/>
    </div>
  );
}
