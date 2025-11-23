import { requireAuth } from "@/lib/auth-guard";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireAuth("admin");

	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b bg-background px-6 py-4">
				<h1 className="text-xl font-bold">Admin Dashboard</h1>
			</header>
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}
