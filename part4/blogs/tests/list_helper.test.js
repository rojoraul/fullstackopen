const listHelper = require('../utils/list_helper')

const initialBlogs = [
    { 
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    { 
        _id: '5a422aa71b54a676234d37f8',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 0
    },
    { 
        _id: '1422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful 3',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    }
]

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [initialBlogs[0]]
        
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(blogs[0].likes)
    })

    test('of a bigger list is calculated correctly', () => {
        const result = listHelper.totalLikes(initialBlogs)
        let sum = 0;

        initialBlogs.forEach(blog => {
            sum += blog.likes
        })
        
        expect(result).toBe(sum)
    })    
})

describe('favorite blog', ()=> {
    test('of empty list is undefined', () => {
        const blogs = []
        
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toBe(undefined)
    })

    test('when list has only one blog equals the object of that', () => {
        const blogs = [initialBlogs[0]]
        
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
    })

    test('of a bigger list is calculated correctly', () => {
        const result = listHelper.favoriteBlog(initialBlogs)
        const likes = initialBlogs.map(blog => blog.likes)
        const maxLikes = Math.max.apply(null, likes)

        expect(result).toEqual(initialBlogs.find(blog => blog.likes === maxLikes))
    })    
})

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })