import { BadgesRepository } from "@/repositories/badges-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class GetBadgeService {
  constructor(private badgesRepository: BadgesRepository) { }

  async execute(badgeId: string) {
    const badge = await this.badgesRepository.findById(badgeId)
    if (!badge) {
      throw new ResourceNotFound('Insígnia não encontrada')
    }

    return badge
  }
}