import { BadgesRepository } from "@/repositories/badges-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
import { CompanyRepository } from "@/repositories/company-repository";
import { MultipartFile } from "@fastify/multipart";
import uploadImageToBucket from "@/lib/upload-image-to-bucket";

export interface CreateBadgeData {
  title: string
  description: string
  companyId: string
  image?: MultipartFile | null
  classification: string
  skillType: string
}

export class CreateBadgeService {
  constructor(private badgesRepository: BadgesRepository, private companiesRepository: CompanyRepository) { }

  async execute(data: CreateBadgeData) {
    const company = await this.companiesRepository.findById(data.companyId)

    if (!company) {
      throw new ResourceNotFound('Empresa não encontrada')
    }

    let imageUrl

    if (data.image) {
      try {
        imageUrl = await uploadImageToBucket.execute({ address: 'badges', file: data.image, userId: data.title })
      } catch (error) {
        throw new Error('Erro ao fazer upload da imagem')
      }
    }

    try {
      const badge = await this.badgesRepository.create({
        title: data.title,
        description: data.description,
        companyId: data.companyId,
        imageUrl: imageUrl || null,
        classification: data.classification,
        skillType: data.skillType
      })
      return badge
    } catch (error) {
      throw new DatabaseError('Não foi possível criar a conquista')
    }
  }
}