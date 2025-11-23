import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "user",
				input: false,
			},
		},
	},
	plugins: [admin()],
});

async function main() {
	console.log("🌱 Seeding database...");

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email: "admin@example.com" },
		});

		if (existingUser) {
			console.log("⚠️ Admin user already exists.");
			return;
		}

		const user = await auth.api.createUser({
			body: {
				email: "admin@example.com",
				password: "password123",
				name: "Admin User",
				role: "admin",
			},
		});

		// Manually update emailVerified since createUser doesn't support it directly
		if (user?.user?.id) {
			await prisma.user.update({
				where: { id: user.user.id },
				data: { emailVerified: true },
			});
			console.log("✅ Admin user created and verified successfully!");
			console.log(`   Email: admin@example.com`);
			console.log(`   Password: password123`);
		}
	} catch (error) {
		console.error("❌ Error creating user:", error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
