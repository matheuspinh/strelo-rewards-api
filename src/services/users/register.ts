import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-errors'
import { User } from '@prisma/client'
import uploadImageToBucket from '@/lib/upload-image-to-bucket'
import { MultipartFile } from '@fastify/multipart'

interface RegisterServiceRequest {
  username: string
  email: string
  password: string
  companyId: string
  role?: string
  image?: MultipartFile
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
    image
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    let image_url
    if (image) {
      image_url = await uploadImageToBucket.execute({ address: 'avatars', file: image, userId: email })
    }

    const user = await this.usersRepository.create({
      email,
      username,
      passwordHash: password_hash,
      companyId,
      role: role || 'user',
      avatarUrl: image_url || null
    })

    return {
      user,
    }
  }
}
