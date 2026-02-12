import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberView } from "@/components/dashboard/member-view";
import { LeaderView } from "@/components/dashboard/leader-view";
import { AdminView } from "@/components/dashboard/admin-view";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const role = session.user.role;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* Calendar or other common actions could go here */}
                </div>
            </div>

            {role === "ADMIN" && <AdminView />}
            {role === "LEADER" && <LeaderView />}
            {role === "MEMBER" && <MemberView />}
        </div>
    );
}
