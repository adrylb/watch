// modules/users/users.service.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { User } from './users.model'

import pino from 'pino'
const logger = pino({ name: 'videos-service' })

export async function createUser(prisma: PrismaClient, email: string, password: string): Promise<User> {
  const hashed = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: { email, password: hashed },
  })
}

async function getAdminUser(): Promise<User> {

  const adminUser: User = {
    id: '0',
    email: 'admin@admin.com',
    password: await bcrypt.hash('admin', 10),
  }

  return adminUser;
}

export async function findUserByEmail(prisma: PrismaClient, email: string): Promise<User | null> {  
  //apenas para acesso sem database  - temp;
  const adminUser: User = await getAdminUser();

  logger.info(email == adminUser.email) //exemplo de logs;
  return email == adminUser.email
    ? adminUser
    : prisma.user.findUnique({ where: { email } })

}

export async function getUsers(prisma: PrismaClient): Promise<Pick<User, 'id' | 'email'>[]> {
  return prisma.user.findMany({
    select: { id: true, email: true },
  })
}

export async function getUserById(prisma: PrismaClient, id: string): Promise<User | null> {
  //apenas para acesso sem database  - temp;
  const adminUser: User = await getAdminUser();

  return adminUser.id == id
    ? adminUser
    : prisma.user.findUnique({ where: { id } })
}

export async function deleteUserById(prisma: PrismaClient, id: string): Promise<void> {
  await prisma.user.delete({ where: { id } })
}