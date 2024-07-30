import { UsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "../errors/user-errors"
import { compare } from "bcryptjs"

export interface LoginData {
  email: string
  password: string
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(data: LoginData) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordMatch = await compare(data.password, user.passwordHash)
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}