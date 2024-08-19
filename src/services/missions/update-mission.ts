import { MissionsRepository } from "@/repositories/missions-repository";
import { ResourceNotFound } from "../errors/general-errors";
import uploadImageToBucket from "@/lib/upload-image-to-bucket";
import { MultipartFile } from "@fastify/multipart";

export interface UpdateMissionServiceRequest {
  title?: string
  description?: string
  image?: MultipartFile
  xp?: number
  gold?: number
  completedByIDs?: string[]
  usersIDs?: string[]
  badgesIDs?: string[]
}

export class UpdateMissionService {
  constructor(private missionsRepository: MissionsRepository) { }

  async execute(missionId: string, data: UpdateMissionServiceRequest) {
    const mission = await this.missionsRepository.findById(missionId)

    if (!mission) {
      throw new ResourceNotFound('Missão não encontrada')
    }

    let image_url
    if (data.image) {
      try {
        image_url = await uploadImageToBucket.execute({ address: 'missions', file: data.image, userId: mission.title })
      } catch (error) {
        throw new Error('Error ao fazer upload da imagem')
      }
    }

    const currentUsersIds = mission.users.map(user => user.id)
    const currentBadgesIds = mission.badges.map(badge => badge.id)

    const userIdsToDisconnect = currentUsersIds.filter(userId => !data.usersIDs?.includes(userId))
    let updatedMission
    try {
      updatedMission = await this.missionsRepository.update(missionId, {
        title: data.title || mission.title,
        description: data.description || mission.description,
        imageUrl: image_url || mission.imageUrl,
        xp: data.xp || mission.xp,
        gold: data.gold || mission.gold,
        completedByIDs: data.completedByIDs || mission.completedByIDs,
        usersIDs: data.usersIDs || mission.usersIDs,
        badgesIDs: data.badgesIDs || mission.badgesIDs,
      })
      return updatedMission
    } catch (error) {
      throw new ResourceNotFound('Error ao atualizar missão')
    }
  }
}