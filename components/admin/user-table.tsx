"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditUserDialog } from "@/components/admin/edit-user-dialog";
import { DeleteUserDialog } from "@/components/admin/delete-user-dialog";
import { Badge } from "@/components/ui/badge";

interface User {
	id: string;
	email: string;
	name: string;
  role?: string;
	createdAt: Date;
	emailVerified: boolean;
	image?: string | null;
}

interface UserTableProps {
	users: User[];
}

export function UserTable({ users }: UserTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Verified</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Badge variant={user.role === "admin" ? "default" : "secondary"}>
									{user.role || "user"}
								</Badge>
							</TableCell>
							<TableCell>
								{user.emailVerified ? (
									<span className="text-green-600">Yes</span>
								) : (
									<span className="text-red-600">No</span>
								)}
							</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end gap-2">
									<EditUserDialog user={user} />
									<DeleteUserDialog userId={user.id} />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
