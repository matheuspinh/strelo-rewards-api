import { BadgesRepository } from "@/repositories/badges-repository";
import { MultipartFile } from "@fastify/multipart";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
import uploadImageToBucket from "@/lib/upload-image-to-bucket";

export interface UpdateBadgeServiceRequest {
  title?: string
  description?: string
  image?: MultipartFile
  classification?: string
  skillType?: string
}

export class UpdateBadgeService {
  constructor(private badgesRepository: BadgesRepository) { }

  async execute(badgeId: string, data: UpdateBadgeServiceRequest) {
    const badge = await this.badgesRepository.findById(badgeId)


    if (!badge) {
      throw new ResourceNotFound('Insígnia não encontrada')
    }

    let image_url
    if (data.image) {
      try {
        image_url = await uploadImageToBucket.execute({ address: 'badges', file: data.image, userId: badge.title })
      } catch (error) {
        throw new Error('Error ao fazer upload da imagem')
      }
    }
    try {
      const updatedBadge = await this.badgesRepository.update(badgeId, {
        title: data.title || badge.title,
        description: data.description || badge.description,
        imageUrl: image_url || badge.imageUrl,
        classification: data.classification || badge.classification,
        skillType: data.skillType || badge.skillType
      })

      return updatedBadge
    } catch (error) {
      throw new DatabaseError('Erro ao atualizar insígnia')
    }
  }
}