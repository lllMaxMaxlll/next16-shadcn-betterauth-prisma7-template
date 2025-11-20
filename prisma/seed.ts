import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function main() {
	console.log("🌱 Starting database seed...");

	try {
		// Create admin user using server-side auth
		const result = await auth.api.signUpEmail({
			body: {
				name: "Admin",
				email: "admin@southbox.com",
				password: "admin123",
			},
		});

		if (result) {
			console.log("✅ Seed completed successfully!");
			console.log("👤 Created admin user:");
			console.log(`   Email: admin@mail.com (password: admin123)`);
		} else {
			console.log("❌ Failed to create admin user");
		}
	} catch (error) {
		console.error("❌ Error creating admin user:", error);
	}
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
