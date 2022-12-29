const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let sum = 0

    blogs.forEach(blog => {
        sum += blog.likes
    });

    return sum
}

const favoriteBlog = (blogs) => {
    if(blogs === null || blogs.length === 0) return
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max.apply(null, likes)
    return blogs.find(blog => blog.likes === maxLikes)
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }