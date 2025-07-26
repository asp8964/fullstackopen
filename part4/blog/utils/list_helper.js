const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return _.reduce(blogs, (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const max = _.maxBy(blogs, 'likes')
  console.log(max)
  return max
  //   return _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const authorPairs = _.toPairs(authorCounts)
  const topAuthorPair = _.maxBy(authorPairs, ([, count]) => count)

  return { author: topAuthorPair[0], blogs: topAuthorPair[1] }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = Object.entries(blogsByAuthor).map(([author, posts]) => ({
    author,
    likes: _.sumBy(posts, 'likes'),
  }))
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
