import { UsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "../errors/user-errors"
import { compare } from "bcryptjs"
import { DatabaseError } from "../errors/general-errors"

export interface LoginData {
  email: string
  password: string
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(data: LoginData) {
    try {
      const user = await this.usersRepository.findByEmail(data.email)

      if (!user) {
        throw new InvalidCredentialsError()
      }

      const isPasswordMatch = await compare(data.password, user.passwordHash)
      if (!isPasswordMatch) {
        throw new InvalidCredentialsError()
      }

      return user
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw error
      }
      throw new DatabaseError('Erro ao tentar autenticar usuário')
    }
  }
}