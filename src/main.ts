import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import Express from 'express'
import http from 'node:http'
import { schema, resolvers } from './graphql/schema.ts'
import { PrismaClient } from './generated/prisma/index.js'

export interface GraphQLContext {
  db: PrismaClient
  token: string | null
}

const prisma = new PrismaClient()

const app = Express()
/**
 * The only reason you need this here is because of the server plugin to drain the HTTP server.
 * which only works with the native http server
 */
const httpServer = http.createServer(app)

const graphqlServer = new ApolloServer<GraphQLContext>({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await graphqlServer.start()

app.use(Express.json())
app.use(
  '/graphql',
  expressMiddleware(graphqlServer, {
    context: async ({ req }) => ({
      db: prisma,
      token: req.headers.authorization ?? null,
    }),
  })
)

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server listening on port 4000`)
})
// you can also do this
// app.listen(4000)

// Kill db connection on exit
await prisma.$disconnect()
