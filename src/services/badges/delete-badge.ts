import { BadgesRepository } from "@/repositories/badges-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class DeleteBadgeService {
  constructor(private badgesRepository: BadgesRepository) { }

  async execute(badgeId: string) {
    try {
      await this.badgesRepository.delete(badgeId)
      return
    } catch (error) {
      throw new ResourceNotFound('Erro ao deletar badge')
    }
  }
}