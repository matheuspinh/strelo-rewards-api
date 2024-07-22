//INTEGRATION TESTS

// import 'dotenv/config'

// import { randomUUID } from 'node:crypto'
// import { execSync } from 'node:child_process'
// import { Environment } from 'vitest'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL

// function generateDatabaseURL(schema: string) {
//   if (!process.env.TEST_DATABASE_URL) {
//     throw new Error('Please provide a DATABASE_URL environment variable.')
//   }

//   const url = new URL(process.env.TEST_DATABASE_URL)

//   url.searchParams.set('schema', schema)

//   return url.toString()
// }

// export default <Environment>{
//   name: 'prisma',
//   async setup() {
//     if (!process.env.TEST_DATABASE_URL) {
//       throw new Error('Please provide a DATABASE_URL environment variable.')
//     }
//     process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
//     // const schema = randomUUID()
//     // const databaseURL = generateDatabaseURL(schema)
//     console.log('TEST_DATABASE_URL', TEST_DATABASE_URL)

//     execSync('npx prisma db')

//     return {
//       async teardown() {
//         // await prisma.$executeRawUnsafe(`db.dropDatabase()`)

//         await prisma.$disconnect()
//       },
//     }
//   },
// }
