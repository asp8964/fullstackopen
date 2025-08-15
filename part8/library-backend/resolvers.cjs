const { GraphQLError, subscribe } = require('graphql')
const Book = require('./models/book.cjs')
const Author = require('./models/author.cjs')
const User = require('./models/user.cjs')
const jose = require('jose')
const mongoose = require('mongoose')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

require('dotenv').config()

const alg = 'HS256'
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

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
    // bookCount: async (root) => {
    //   return Book.find({ author: root }).countDocuments()
    // },
    bookCount: (root) => root.bookOf.length,
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

      const book = new Book({ ...args, author: author._id })
      try {
        const savedBook = await book.save()
        // console.log('book', book, author)
        author.bookOf = author.bookOf.concat(savedBook._id)
        await author.save()
        await savedBook.populate('author')
        // await Author.findByIdAndUpdate(author._id, {
        //   $push: { bookOf: savedBook._id },
        // })

        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
        return savedBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      // pubsub.publish('BOOK_ADDED', { bookAdded: book })

      // return book
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
      console.log(userForToken)

      return {
        value: new jose.SignJWT(userForToken)
          .setProtectedHeader({ alg })
          .sign(secret),
      }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
