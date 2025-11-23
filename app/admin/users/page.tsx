import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserTable } from "@/components/admin/user-table";
import { CreateUserDialog } from "@/components/admin/create-user-dialog";

export default async function UsersPage() {
	const users = await auth.api.listUsers({
		headers: await headers(),
		query: {
			limit: 100,
		},
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold tracking-tight">Users</h2>
				<CreateUserDialog />
			</div>
			<UserTable users={users.users} />
		</div>
	);
}
