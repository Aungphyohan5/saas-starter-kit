
"use server";

import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(80),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    organizationName: z
        .string()
        .min(2, "Workspace name must be at least 2 characters")
        .max(80),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(input: RegisterInput) {
    const parsed = registerSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message ?? "Invalid registration details.",
        };
    }

    const { name, email, password, organizationName } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true },
        });

        if (existingUser) {
            return {
                success: false,
                message: "An account with this email already exists.",
            };
        }

        const passwordHash = await hash(password, 12);

        const baseSlug =
            organizationName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") || "workspace";

        const organizationSlug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;

        await prisma.$transaction(async (tx) => {
            await tx.user.create({
                data: {
                    name: name.trim(),
                    email: normalizedEmail,
                    passwordHash,
                    memberships: {
                        create: {
                            role: "OWNER",
                            organization: {
                                create: {
                                    name: organizationName.trim(),
                                    slug: organizationSlug,
                                },
                            },
                        },
                    },
                },
            });
        });

        return {
            success: true,
            message: "Your account has been created successfully.",
        };
    } catch (error) {
        console.error("Registration error:", error);

        return {
            success: false,
            message: "Unable to create your account. Please try again.",
        };
    }
}
