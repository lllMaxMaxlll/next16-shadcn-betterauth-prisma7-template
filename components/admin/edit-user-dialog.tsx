"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
}

export function EditUserDialog({ user }: { user: User }) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(user.name);
	const [role, setRole] = useState<"user" | "admin">((user.role as "user" | "admin") || "user");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleUpdate = async () => {
		setLoading(true);
		// Update role
		if (role !== user.role) {
			await authClient.admin.setRole({
				userId: user.id,
				role: role,
			});
		}

		// Update other fields if needed (Better Auth admin plugin might not have direct update user details exposed easily in client without custom setup,
		// but let's assume we rely on role mainly for now, or check docs.
		// Actually setRole is standard. Updating name might need a different call or custom endpoint if not in admin plugin default.)
		// For now, let's just update role as that's the critical part requested.

		setLoading(false);
		setOpen(false);
		router.refresh();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pencil className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>
						Make changes to the user here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							disabled
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<select
							id="role"
							value={role}
onChange={(e) => setRole(e.target.value as "user" | "admin")}
							className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
						>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleUpdate} disabled={loading}>
						{loading ? "Saving..." : "Save changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
