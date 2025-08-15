const { ApolloServer } = require('@apollo/server')

// const { startStandaloneServer } = require('@apollo/server/standalone')

const { expressMiddleware } = require('@as-integrations/express5')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const mongoose = require('mongoose')

const User = require('./models/user.cjs')
const typeDefs = require('./schema.cjs')
const resolvers = require('./resolvers.cjs')
const jose = require('jose')

require('dotenv').config()

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
mongoose.set('debug', true)

// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        // console.log('auth', auth)

        if (auth && auth.startsWith('Bearer ')) {
          const { payload } = await jose.jwtVerify(auth.substring(7), secret)

          const currentUser = await User.findById(payload.id)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     console.log('auth', auth)

//     if (auth && auth.startsWith('Bearer ')) {
//       const { payload } = await jose.jwtVerify(auth.substring(7), secret)

//       const currentUser = await User.findById(payload.id)
//       return { currentUser }
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })
