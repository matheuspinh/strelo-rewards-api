import { BadgesRepository } from "@/repositories/badges-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";

export class DeleteBadgeService {
  constructor(private badgesRepository: BadgesRepository) { }

  async execute(badgeId: string) {
    try {
      await this.badgesRepository.delete(badgeId)
      return
    } catch (error) {
      throw new DatabaseError('Erro ao deletar badge')
    }
  }
}