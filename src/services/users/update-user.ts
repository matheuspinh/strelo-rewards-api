import { UsersRepository } from "@/repositories/users-repository";
import { MultipartFile } from "@fastify/multipart";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
import uploadImageToBucket from "@/lib/upload-image-to-bucket";
import { UserAlreadyExistsError } from "../errors/user-errors";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

export interface UpdateUserServiceRequest {
  username?: string
  email?: string
  password?: string
  role?: string
  image?: MultipartFile
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(userId: string, data: UpdateUserServiceRequest) {
    try {
      const user = await this.usersRepository.findById(userId) as unknown as User

      if (!user) {
        throw new ResourceNotFound('Usuário não encontrado')
      }

      if (data.email) {
        const userWithSameEmail = await this.usersRepository.findByEmail(data.email)

        if (userWithSameEmail && userWithSameEmail.id !== userId) {
          throw new UserAlreadyExistsError()
        }
      }

      if (data.password) {
        data.password = await hash(data.password, 6)
      }

      let image_url
      if (data.image) {
        try {
          image_url = await uploadImageToBucket.execute({ address: 'avatars', file: data.image, userId: user.email })
        } catch (error) {
          throw new Error('Error ao fazer upload da imagem')
        }
      }

      let updatedUser
      try {
        updatedUser = await this.usersRepository.update(userId, {
          email: data.email || user.email,
          username: data.username || user.username,
          passwordHash: data.password || user.passwordHash,
          avatarUrl: image_url || user.avatarUrl
        })
      } catch (error) {
        throw new ResourceNotFound('Erro ao atualizar usuário')
      }

      return updatedUser
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw error
      }
      if (error instanceof ResourceNotFound) {
        throw error
      }
      if (error instanceof Error && error.message === 'Error ao fazer upload da imagem') {
        throw error
      }
      throw new DatabaseError('Error ao atualizar usuário')
    }
  }
}