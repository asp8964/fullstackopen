const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/book.cjs')
const Author = require('./models/author.cjs')
const User = require('./models/user.cjs')
const jose = require('jose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const alg = 'HS256'
const jwtSecret = process.env.JWT_SECRET
const secret = new TextEncoder().encode(jwtSecret)

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

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      console.log(args)
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author }, { genres: args.genre }).populate(
          'author'
        )
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        console.log(author)
        return Book.find({ author: author }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (_, __, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root }).countDocuments()
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const author = await Author.findOne({ name: args.author })
      // console.log(args, author)
      if (!author) {
        throw new GraphQLError('no such author', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const book = new Book({ ...args, author: author })
      try {
        // console.log(book)
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return book
    },

    editAuthor: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const result = await Author.findOne({ name: args.name })
      // console.log('result', result)
      if (!result) {
        throw new GraphQLError('no such author', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      try {
        result.born = args.setBornTo
        await result.save()
      } catch (error) {
        throw new GraphQLError('Saving born failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
      return result
    },

    createUser: async (_, args) => {
      console.log(args)
      const user = new User(args)

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id.toString(),
      }
      // console.log(userForToken)

      return {
        value: new jose.SignJWT(userForToken)
          .setProtectedHeader({ alg })
          .sign(secret),
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    // console.log('auth', auth)

    if (auth && auth.startsWith('Bearer ')) {
      const { payload } = await jose.jwtVerify(auth.substring(7), secret)

      const currentUser = await User.findById(payload.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
