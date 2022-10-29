import request from 'supertest'
import {app} from "../../index";
import {blogsRepository} from "../../repositories/blogs-repository";
import {readdir} from "fs/promises";

jest.setTimeout(30000)

describe('/posts', () => {
    beforeEach(async  () => {
        await  request(app).delete('/testing/all-data')
    })

// Blogs router test

    // Method POST

    // it('Method POST /blogs. Expected 401 - unauthorized', async  () => {
    //     await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .expect(401)
    // })
    //
    // it('Method POST /blogs. Expected 400 - bad request', async () => {
    //     await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "",
    //             "youtubeUrl": ""
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /blogs. Expected 400 - so long request', async () => {
    //     await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "iW5g62pgeFlDUQPf", // 16
    //             "youtubeUrl": "Tauarym2ql7Yd1HOYOX4e5cNULuH7w1w7B4ZRnFrRD39szf8oKDvmzYss8VU2dxTKyWl2Bs527HhycUrpigYpFsTiYnzN5ULlx034" // 101
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /blogs + GET /blogs/id. Expected 201 - return new blog', async () => {
    //     const createResponse = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createResponse.body
    //
    //     expect(createdBlog).toEqual({
    //         id: expect.any(String),
    //         name: createdBlogs.name,
    //         youtubeUrl: expect.stringMatching(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/),
    //         createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    //     })
    //
    //     const blog = await request(app)
    //         .get(`/blogs/${createdBlog.id}`)
    //         .expect(200)
    //
    //     expect(blog.body).toEqual(createdBlog)
    // })
    //
    // it('Method POST /blogs/blogsId/posts. Expected 404 - blog not found', async () => {
    //     const createBlog = await request(app)
    //         .post('/blogs/0/posts')
    //         .send({
    //             "title": "string",
    //             "shortDescription": "string",
    //             "content": "string"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(404)
    // })
    //
    // it('Method POST /blogs/blogsId/posts. Expected 401 - unauthorized', async () => {
    //     const createBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createBlog.body
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //                 "title": "Beautiful title",
    //                 "shortDescription": "Some interesting description",
    //                 "content": "Useful content"
    //         })
    //         .expect(401)
    // })
    //
    // it('Method POST /blogs/blogsId/posts. Expected 400 - incorrect input model', async () => {
    //     const createBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createBlog.body
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //             "title": "",
    //             "shortDescription": "",
    //             "content": "",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /blogs/blogsId/posts. Expected 400 - so long request', async () => {
    //     const createBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createBlog.body
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //             "title": "T3xdTb29DLyC1guW7us6dE9SOvAbb7c", // 31
    //             "shortDescription": "VM5sNPHGh9R6rbLuhxhYYSrbRSPSA1klIzZsNkP6TLAnp0zVpoCbKYhG83rExAFd5nSHGTyZdBuv3FjN5lWmMiX7O0mcrSD2GU9BK", // 101
    //             "content": "vrLXFe8tMVRPeg2hyM4JSs8gLXJKdwwj5SgwfRQIMrrcIKsoF3XXKpi102Bc0BKsKo9dZhw2sdJdqXYBGXOm7bkERRkawYzAncxnMjeD0uMmdDZdacVcgXMj2TrAAGz8hXkslsheanJglrShZJIkcvZ16rioXlrtys1ruKI6M9ckRIHILod3mxrWxDAsjlMuIWqSXhxrV0Pxnv5m7qGLHcHfuLhsqtcxnsYsHyDqctrUI21DJB4q5KK1t2CIUk8X8Gcsu0htLZoGIHghO4ZRWN8SEAgkRkI8boIQ7X68DcihnHjv00yunzaFDhMjwBWdso2aoakEui0u7LNvNp57C0ccOp5tNQnYnpxQHUfJ4nnt5zJSGAvlgKw1kFZjr7Kql2H9imVrh4U2Vs2vTEzLqWDwrG5OkzCo0q1M7fy52YNxMNO2n60hgUOECySmPvaqyyhhPAD17j88mM9j9TdANzFTCtWDkDEYVEpXAG95M8EGIpM1LJ7PoQJzszhMi7Odka25xK98FgnzwqB1cLHOfuyE6rqxguWe3bcEdJzAf16NLFQTQOu4jZfCIm0rSRnTWquEGyb7gHxQYlVM4BTbVPgj8THdc2QS28RGEvtS7A2ZUZSShIAlRHr99Hd8BuXN9N10FiiRH43i8oYukGqBb0F45F7Xh8BH6wj5D8lqXJW73iAlNePvSt4P569pLUAtPjp59HFQpPOByn34mszFPjbRgiSl7wE7gAU11rYU64zsbgS0QISBVYOXE6mtECwmLxBTi7clXGw37tWGt3cpqtyzKDMwUIBnfQBy0IjDalcIpmZFV9u2vK6EcsdOoyZcmJseTbU0owUJiJnKpqLE1zWFKC4Pvh4JitBRUuFufWDcuoSeZGCgYMJqjkDQTnbZe9RYz88iqwMbDq87TzmW62jZ52ow6MhQYYmaJfvbEYKHgaikXt0a94KTs5lXcqYh7jiqs6TYGSWHKdFLvw1K8omZu2QTo8d5aco3YRhv0", // 1001
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /blogs/blogsId/posts + GET /posts/blogId. Expected 201 - return created post by blogId', async () => {
    //     const createBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createBlog.body
    //
    //     const createPost = await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //             "title": "Beautiful title",
    //             "shortDescription": "Some interesting description",
    //             "content": "Useful content",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdPost = createPost.body
    //
    //     expect(createdPost).toEqual({
    //         id: expect.any(String),
    //         title: createdPost.title,
    //         shortDescription: createdPost.shortDescription,
    //         content: createdPost.content,
    //         blogId: createdBlog.id,
    //         blogName: createdBlog.name,
    //         createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    //     })
    //
    //     const post = await request(app)
    //         .get(`/posts/${createdPost.id}`)
    //         .expect(200)
    //
    //     expect(post.body).toEqual(createdPost)
    // })

    // Method GET (GET by id method is checked in POST)

    // it('Method GET /blogs without input query parameters. ' +
    //          'Expected 200 - return page with blogs ', async () => {
    //     const createBlog1 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog1",
    //             "youtubeUrl": "https://someurl2.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //        const createBlog2 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog2",
    //             "youtubeUrl": "https://someurl2.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog1 = createBlog1.body
    //     const createdBlog2 = createBlog2.body
    //
    //     const expectItems = [createdBlog2, createdBlog1]
    //
    //     const givePageWithBlogs = await request(app)
    //         .get('/blogs')
    //         .expect(200)
    //
    //     const createdPageWithBlogs = givePageWithBlogs.body
    //
    //     expect(createdPageWithBlogs).toEqual({
    //         pagesCount: 1,
    //         page: 1,
    //         pageSize: 10,
    //         totalCount: 2,
    //         items: expectItems
    //     })
    // })
    //
    // it('Method GET /blogs with searchNameTerm=new&pageSize=2&sortBy=youtubeUrl&sortDirection=asc.' +
    //    'Expected 200 - return page with 2 blogs', async () => {
    //     const createBlog1 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog1",
    //             "youtubeUrl": "https://someurl4.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog2 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog2",
    //             "youtubeUrl": "https://someurl3.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog3 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog3",
    //             "youtubeUrl": "https://someurl2.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog4 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "blog4",
    //             "youtubeUrl": "https://someurl1.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog1 = createBlog1.body
    //     const createdBlog2 = createBlog2.body
    //     const createdBlog3 = createBlog3.body
    //
    //     const expectItems = [createdBlog3, createdBlog2]
    //
    //     const createResponse = await request(app)
    //         .get('/blogs?searchNameTerm=new&pageSize=2&sortBy=youtubeUrl&sortDirection=asc')
    //         .expect(200)
    //
    //     const createdPageWithBlogs = createResponse.body
    //
    //     expect(createdPageWithBlogs).toEqual({
    //         pagesCount: 2,
    //         page: 1,
    //         pageSize: 2,
    //         totalCount: 3,
    //         items: expectItems
    //     })
    // })
    //
    // it('Method GET /blogs with searchNameTerm=new&pageSize=2&sortBy=youtubeUrl&sortDirection=asc&pageNumber=2.' +
    //     'Expected 200 - return page with 1 blog', async () => {
    //     const createBlog1 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog1",
    //             "youtubeUrl": "https://someurl4.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog2 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog2",
    //             "youtubeUrl": "https://someurl3.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog3 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog3",
    //             "youtubeUrl": "https://someurl2.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createBlog4 = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "blog4",
    //             "youtubeUrl": "https://someurl1.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog1 = createBlog1.body
    //
    //     const expectItems = [createdBlog1]
    //
    //     const createResponse = await request(app)
    //         .get('/blogs?searchNameTerm=new&pageSize=2&sortBy=youtubeUrl&sortDirection=asc&pageNumber=2')
    //         .expect(200)
    //
    //     const createdPageWithBlogs = createResponse.body
    //
    //     expect(createdPageWithBlogs).toEqual({
    //         pagesCount: 2,
    //         page: 2,
    //         pageSize: 2,
    //         totalCount: 3,
    //         items: expectItems
    //     })
    // })
    //
    // it('Method GET by id. Expected 404 - blog not found', async () => {
    //     await request(app)
    //         .get('/blogs/0')
    //         .expect(404)
    // })
    //
    // it('Method GET /blogs/blogId/posts. Expect 404 - blog not found', async () => {
    //     await request(app)
    //         .get('/blogs/0')
    //         .expect(404)
    // })
    //
    // it('Method GET /blogs/blogId/posts with pageSize=2&sortBy=title&sortDirection=asc&pageNumber=2' +
    //     'Expect 200 - return page with 1 post', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlogId = createNewBlog.body.id
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlogId}/posts`)
    //         .send({
    //             "title": "Beautiful title",
    //             "shortDescription": "Some interesting description",
    //             "content": "Useful content",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     await request(app)
    //         .get(`/blogs/${createdBlogId}/posts?pageSize=2&sortBy=title&sortDirection=asc&pageNumber=2`)
    //         .expect(200)
    // })
    //
    // it('Method GET /blogs/blogId/posts without input query parameters.' +
    //          'Expect 200 - return page with post', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createNewBlog.body
    //
    //     const createPost1 = await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //             "title": "Beautiful title1",
    //             "shortDescription": "Some interesting description1",
    //             "content": "Useful content1",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createPost2 = await request(app)
    //         .post(`/blogs/${createdBlog.id}/posts`)
    //         .send({
    //             "title": "Beautiful title2",
    //             "shortDescription": "Some interesting description2",
    //             "content": "Useful content2",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdPost1 = createPost1.body
    //     const createdPost2 = createPost2.body
    //
    //     const expectItems = [createdPost2, createdPost1]
    //
    //     const givePageWithPosts = await request(app)
    //         .get(`/blogs/${createdBlog.id}/posts`)
    //         .expect(200)
    //
    //     const createdPageWithPosts = givePageWithPosts.body
    //
    //     expect(createdPageWithPosts).toEqual({
    //         pagesCount: 1,
    //         page: 1,
    //         pageSize: 10,
    //         totalCount: 2,
    //         items: expectItems
    //     })
    // })
    //
    // it('Method GET /blogs/blogId/posts with pageSize=2&sortBy=title&sortDirection=asc' +
    //     'Expect 200 - return page with 2 posts', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlogs = createNewBlog.body
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title4",
    //             "shortDescription": "Some interesting description4",
    //             "content": "Useful content4",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createPost2 = await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title3",
    //             "shortDescription": "Some interesting description3",
    //             "content": "Useful content3",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createPost3 = await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title2",
    //             "shortDescription": "Some interesting description2",
    //             "content": "Useful content2",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdPost2 = createPost2.body
    //     const createdPost3 = createPost3.body
    //
    //     const expectItems = [createdPost3, createdPost2]
    //
    //     const createResponse = await request(app)
    //         .get(`/blogs/${createdBlogs.id}/posts?pageSize=2&sortBy=title&sortDirection=asc`)
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(200)
    //
    //     const createdPageWithPosts = createResponse.body
    //
    //     expect(createdPageWithPosts).toEqual({
    //         pagesCount: 2,
    //         page: 1,
    //         pageSize: 2,
    //         totalCount: 3,
    //         items: expectItems
    //     })
    // })
    //
    // it('Method GET /blogs/blogId/posts with pageSize=2&sortBy=title&sortDirection=asc&pageNumber=2' +
    //     'Expect 200 - return page with 1 post', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlogs = createNewBlog.body
    //
    //     const createPost1 = await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title4",
    //             "shortDescription": "Some interesting description4",
    //             "content": "Useful content4",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title3",
    //             "shortDescription": "Some interesting description3",
    //             "content": "Useful content3",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     await request(app)
    //         .post(`/blogs/${createdBlogs.id}/posts`)
    //         .send({
    //             "title": "Beautiful title2",
    //             "shortDescription": "Some interesting description2",
    //             "content": "Useful content2",
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdPost1 = createPost1.body
    //
    //     const expectItems = [createdPost1]
    //
    //     const createResponse = await request(app)
    //         .get(`/blogs/${createdBlogs.id}/posts?pageSize=2&sortBy=title&sortDirection=asc&pageNumber=2`)
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(200)
    //
    //     const createdPageWithPosts = createResponse.body
    //
    //     expect(createdPageWithPosts).toEqual({
    //         pagesCount: 2,
    //         page: 2,
    //         pageSize: 2,
    //         totalCount: 3,
    //         items: expectItems
    //     })
    // })

    // Method PUT

    // it('Method PUT /blogs by id. Expected 401 - unauthorized', async () => {
    //     await request(app)
    //         .put('/blogs/' + '0')
    //         .send({
    //             "name": "old blog",
    //             "youtubeUrl": "https://someoldurl.com"
    //         })
    //         .expect(401)
    // })
    //
    // it('Method PUT by id. Expected 404 - blog not found', async () => {
    //     await request(app)
    //         .put('/blogs/' + '0')
    //         .send({
    //             "name": "old blog",
    //             "youtubeUrl": "https://someoldurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(404)
    // })
    //
    // it('Method PUT by id. Expected 400 - bad request', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createNewBlog.body
    //
    //     await request(app)
    //         .put('/blogs/' + createdBlog.id)
    //         .send({
    //             "name": "",
    //             "youtubeUrl": ""
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method PUT by id. Expected 400 - bad request, so long', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createNewBlog.body
    //
    //     await request(app)
    //         .put('/blogs/' + createdBlog.id)
    //         .send({
    //             "name": "hfZGIF8GkFak8aWc", // 16
    //             "youtubeUrl": "VEkg6zSttbWNu4IbtUGj0BBOadu123TqMegg5YlVOlYZRiTtVm1phDbKTacjEVf5G0WGyx10oErbCAEaNAmWsw6hMJFlgv29wabvn" // 101
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method PUT by id. Expected 204 - update blog', async () => {
    //     const createNewBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createNewBlog.body
    //
    //     await request(app)
    //         .put('/blogs/' + createdBlog.id)
    //         .send({
    //             "name": "old blog",
    //             "youtubeUrl": "https://someoldurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(204)
    // })

    // Method DELETE

    // it('Method DELETE /blogs.Expect 404 - blog not found', async ()=> {
    //     await request(app)
    //         .delete('/blogs/0')
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(404)
    // })
    //
    // it('Method DELETE /blogs.Expect 401 - unauthorized', async ()=> {
    //     await request(app)
    //         .delete('/blogs/0')
    //         .expect(401)
    // })

    // Posts router test

    // Method POST

    // it('Method POST /posts. Expected 401 - unauthorized', async  () => {
    //     await request(app)
    //         .post('/posts')
    //         .send({
    //             "title": "Beautiful title",
    //             "shortDescription": "Some interesting description",
    //             "content": "Useful content",
    //             "blogId": "string"
    //         })
    //         .expect(401)
    // })
    //
    // it('Method POST /posts. Expected 400 - bad request', async () => {
    //     await request(app)
    //         .post('/posts')
    //         .send({
    //             "title": "",
    //             "shortDescription": "",
    //             "content": "",
    //             "blogId": ""
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /posts. Expected 400 - so long request', async () => {
    //     await request(app)
    //         .post('/posts')
    //         .send({
    //             "title": "T3xdTb29DLyC1guW7us6dE9SOvAbb7c", // 31
    //             "shortDescription": "VM5sNPHGh9R6rbLuhxhYYSrbRSPSA1klIzZsNkP6TLAnp0zVpoCbKYhG83rExAFd5nSHGTyZdBuv3FjN5lWmMiX7O0mcrSD2GU9BK", // 101
    //             "content": "vrLXFe8tMVRPeg2hyM4JSs8gLXJKdwwj5SgwfRQIMrrcIKsoF3XXKpi102Bc0BKsKo9dZhw2sdJdqXYBGXOm7bkERRkawYzAncxnMjeD0uMmdDZdacVcgXMj2TrAAGz8hXkslsheanJglrShZJIkcvZ16rioXlrtys1ruKI6M9ckRIHILod3mxrWxDAsjlMuIWqSXhxrV0Pxnv5m7qGLHcHfuLhsqtcxnsYsHyDqctrUI21DJB4q5KK1t2CIUk8X8Gcsu0htLZoGIHghO4ZRWN8SEAgkRkI8boIQ7X68DcihnHjv00yunzaFDhMjwBWdso2aoakEui0u7LNvNp57C0ccOp5tNQnYnpxQHUfJ4nnt5zJSGAvlgKw1kFZjr7Kql2H9imVrh4U2Vs2vTEzLqWDwrG5OkzCo0q1M7fy52YNxMNO2n60hgUOECySmPvaqyyhhPAD17j88mM9j9TdANzFTCtWDkDEYVEpXAG95M8EGIpM1LJ7PoQJzszhMi7Odka25xK98FgnzwqB1cLHOfuyE6rqxguWe3bcEdJzAf16NLFQTQOu4jZfCIm0rSRnTWquEGyb7gHxQYlVM4BTbVPgj8THdc2QS28RGEvtS7A2ZUZSShIAlRHr99Hd8BuXN9N10FiiRH43i8oYukGqBb0F45F7Xh8BH6wj5D8lqXJW73iAlNePvSt4P569pLUAtPjp59HFQpPOByn34mszFPjbRgiSl7wE7gAU11rYU64zsbgS0QISBVYOXE6mtECwmLxBTi7clXGw37tWGt3cpqtyzKDMwUIBnfQBy0IjDalcIpmZFV9u2vK6EcsdOoyZcmJseTbU0owUJiJnKpqLE1zWFKC4Pvh4JitBRUuFufWDcuoSeZGCgYMJqjkDQTnbZe9RYz88iqwMbDq87TzmW62jZ52ow6MhQYYmaJfvbEYKHgaikXt0a94KTs5lXcqYh7jiqs6TYGSWHKdFLvw1K8omZu2QTo8d5aco3YRhv0", // 1001
    //             "blogId": "string"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(400)
    // })
    //
    // it('Method POST /posts + GET /posts/id. Expected 201 - return new post', async  () => {
    //     const createBlog = await request(app)
    //         .post('/blogs')
    //         .send({
    //             "name": "new blog",
    //             "youtubeUrl": "https://someurl.com"
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdBlog = createBlog.body
    //
    //     const createResponse = await request(app)
    //         .post('/posts')
    //         .send({
    //             "title": "Beautiful title",
    //             "shortDescription": "Some interesting description",
    //             "content": "Useful content",
    //             "blogId": createdBlog.id
    //         })
    //         .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
    //         .expect(201)
    //
    //     const createdPost = createResponse.body
    //
    //     expect(createdPost).toEqual({
    //         id: expect.any(String),
    //         title: createdPost.title,
    //         shortDescription: createdPost.shortDescription,
    //         content: createdPost.content,
    //         blogId: createdPost.blogId,
    //         blogName: expect.any(String),
    //         createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    //     })
    //
    //     const post = await request(app)
    //         .get(`/posts/${createdPost.id}`)
    //
    //     expect(post.body).toEqual(createdPost)
    // })

    // Method GET

    it('Method GET /posts without input query parameters. ' +
             'Expected 200 - return page with blogs ', async () => {
        const createBlog = await request(app)
            .post('/blogs')
            .send({
                "name": "new blog",
                "youtubeUrl": "https://someurl.com"
            })
            .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
            .expect(201)

        const createdBlog = createBlog.body

        const createPost1 = await request(app)
            .post('posts')
            .set({
                "title": "Beautiful title2",
                "shortDescription": "Some interesting description2",
                "content": "Useful content2",
                "blogId": createdBlog.id
            })
            .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
            .expect(201)

        const createPost2 = await request(app)
            .post('posts')
            .set({
                "title": "Beautiful title1",
                "shortDescription": "Some interesting description1",
                "content": "Useful content1",
                "blogId": createdBlog.id
            })
            .set({Authorization: 'Basic YWRtaW46cXdlcnR5'})
            .expect(201)

        const expectItems = [createPost2, createPost1]

        const givePageWithPosts = await request(app)
            .get('/posts')
            .expect(200)

        const createdPageWithPosts = givePageWithPosts.body

        expect(createdPageWithPosts).toEqual({
            pagesCount: 1,
            page: 1,
            pageSize: 10,
            totalCount: 2,
            items: expectItems
        })
    })
})