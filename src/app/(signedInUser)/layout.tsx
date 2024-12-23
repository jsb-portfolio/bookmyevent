import { validateAuth } from "@/utils/lucia"
import { redirect } from "next/navigation";


export default async function SignedInUserLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { session } = await validateAuth();
	if (!session) {
		return redirect("/login")
	}
    return <>
    <div className="divider m-0" />
    {children}
    </>
}