import { CompanyRepository } from "@/repositories/company-repository";
import { MissionsRepository } from "@/repositories/missions-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
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
  category: string
}

export class CreateMissionService {
  constructor(private missionsRepository: MissionsRepository, private companiesRepository: CompanyRepository) { }

  async execute(data: CreateMissionData) {
    try {
      const company = await this.companiesRepository.findById(data.companyId)


      if (!company) {
        throw new Error('Company not found')
      }
    } catch (error) {
      throw new ResourceNotFound('Company not found')
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
      const mission = await this.missionsRepository.create({
        title: data.title,
        description: data.description,
        xp: data.xp,
        gold: data.gold,
        companyId: data.companyId,
        badgesIDs: data.badgesIDs,
        usersIDs: data.usersIDs,
        imageUrl: imageUrl || null,
        category: data.category
      })
      return mission
    } catch (error) {
      throw new DatabaseError('Error creating mission')
    }
  }
}