import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-errors'
import { User } from '@prisma/client'

interface RegisterServiceRequest {
  username: string
  email: string
  password: string
  companyId: string
  role?: string
  avatarUrl?: string
}

interface RegisterServiceResponse {
  user: User
}
export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    username,
    password,
    companyId,
    role,
    avatarUrl
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      username,
      passwordHash: password_hash,
      companyId,
      role: role || 'user',
      avatarUrl: avatarUrl || null
    })

    return {
      user,
    }
  }
}
