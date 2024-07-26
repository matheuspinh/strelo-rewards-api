import { CompanyRepository } from "@/repositories/company-repository";
import { MissionsRepository } from "@/repositories/missions-repository";
import { DatabaseError } from "../errors/general-errors";
import { MultipartFile } from "@fastify/multipart";
import uploadImageToBucket from "@/lib/upload-image-to-bucket";

export interface CreateMissionData {
  title: string
  description: string
  imageUrl?: string
  xp: number
  gold: number
  companyId: string
  badgesIDs: string[]
  usersIDs: string[]
  image?: MultipartFile
}

export class CreateMissionService {
  constructor(private missionsRepoository: MissionsRepository, private companiesRepository: CompanyRepository) { }

  async execute(data: CreateMissionData) {
    const company = await this.companiesRepository.findById(data.companyId)

    if (!company) {
      throw new Error('Company not found')
    }

    let imageUrl
    if (data.image) {
      try {
        imageUrl = await uploadImageToBucket.execute({ address: 'missions', file: data.image, userId: data.title })
      } catch (error) {
        throw new Error('Error ao fazer upload da imagem')
      }
    }

    try {
      const mission = await this.missionsRepoository.create({
        ...data,
        imageUrl: imageUrl || null
      })
      return mission
    } catch (error) {
      throw new DatabaseError('Error creating mission')
    }
  }
}