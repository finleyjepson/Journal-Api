import app from './app.js'
import request  from 'supertest'

describe("App Test", () => {
    test("GET /", async () => {
        const res = await request(app).get('/')
        // console.log(res.header)
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })

    test('POST /entries', async () => {
        const cats = await request(app).get('/categories')
        const res = await request(app).post('/entries').send({
          category: cats.body[0]._id,
          content: 'Jest test content'
        })
    
        expect(res.status).toBe(201)
        expect(res.header['content-type']).toContain('json')
        
    
        // Cleanup
        request(app).delete(`/entries/${res.body._id}`)
      })

    describe("GET /categories", () => {
        let res

        beforeEach(async () => {
            res = await request(app).get('/categories')
        })

        test("Returns JSON content", async () => {
            expect(res.status).toBe(200)
            expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        })

        test("Returns an array", async () => {
            expect(res.body).toBeInstanceOf(Array)
        })

        test("Array has 4 elements", async () => {
            expect(res.body).toHaveLength(4)
        })

        test('One element is an object with key "name" == "Food"', async () => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({name: 'Food'})]))
        })
    })
})