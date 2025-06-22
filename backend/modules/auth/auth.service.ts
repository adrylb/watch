// modules/auth/auth.service.ts
import { FastifyInstance } from 'fastify'
import { compare } from 'bcryptjs'
import { findUserByEmail } from '../users/users.service'

export async function loginUser(app: FastifyInstance, email: string, password: string): Promise<string | null> {
  app.log.info(`${email} : ${password}`);
  const user = await findUserByEmail(app.prisma, email)    
  if (!user) return null

  app.log.info(`${user.password} : ${password}`);
  const match = await compare(password, user.password)
  if (!match) return null

  app.log.info(user.id);
  return app.jwt.sign({ id: user.id, email: user.email })
}
