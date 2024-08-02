import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password_hash = await hash(env.SEED_ADMIN_PASSWORD, 6);
  const company = await prisma.company.upsert({
    where: { name: 'strelo' },
    update: {},
    create: {
      name: 'strelo',
      users: {
        create: {
          email: env.SEED_ADMIN_EMAIL,
          passwordHash: password_hash,
          username: 'admin',
          role: 'admin',
        }
      },
      badges: {
        create: {
          title: 'Novo Usuário',
          description: 'Usuário participa da plataforma pela primeira vez'
        }
      },
      description: 'A company that helps other companies to grow',
    }
  })
}

main().catch((error) => {
  console.error('Error seeding', error);
  process.exit(1);
});