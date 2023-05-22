import getSession from "@/utils/session"
import { redirect } from "next/navigation"

export default function OrderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = getSession()

    if (!session.isLoggedIn) {
        redirect("/")
    }

    return (

        <div>
            {children}
        </div>
    )
}
