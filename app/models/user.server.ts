import type { Password, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import bcrypt from "bcryptjs";
import { matchSorter } from "match-sorter";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

type UserResult = {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  email: string;
  profilePic?: string | null; // shown on the landing page
  bio?: string | null; // used as the big title for the landing page
  intro?: string | null; // used as the big title for the landing page
};

export async function getUsers(
  query?: string | null,
): Promise<UserResult[] | null> {
  let users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      profilePic: true,
      bio: true,
      intro: true,
    },
    orderBy: { updatedAt: "desc" },
  });
  if (query) {
    users = matchSorter(users, query, {
      keys: ["firstName", "lastName", "name", "email"],
    });
  }
  return users;
}

export async function getUserById(id: User["id"]): Promise<UserResult | null> {
  return prisma.user.findUnique({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      profilePic: true,
      bio: true,
      intro: true,
    },
    where: { id },
  });
}

export async function getUserByEmail(
  email: User["email"],
): Promise<UserResult | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(
  username: User["name"],
): Promise<UserResult | null> {
  return prisma.user.findUnique({ where: { name: username } });
}

export async function createUser(
  email: User["email"],
  password: string,
  username?: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      name: username ?? email.split("@")[0],
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
