import request from 'supertest';
import server from '../../server';


describe('POST /api/products', () => {
    it('Should return validation errors', async () => {

        const response = await request(server).post('/api/products').send()
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.status).not.toBe(201);
        expect(response.body.errors).toHaveLength(4);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('Should validate that price is greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: 'Testing 1',
            price: 0,
        })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.status).not.toBe(201);
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('Should validate that price is a number and greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: 'Testing 1',
            price: 'hola',
        })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.status).not.toBe(201);
        expect(response.body.errors).toHaveLength(2);
        expect(response.body.errors).not.toHaveLength(4);
    })

    it('Should create a new user', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Testing Users',
            price: 333,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('error');
    })
})

describe('GET /api/products', () => {

    it('Should check if api/products is working', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(400);
    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);
        expect(response.body).not.toHaveProperty('errors');
    })

})

describe('GET /api/products/:id', () => {

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/not-valid').send({
            name: 'Testing 1',
            price: 200,
            availability: true
        })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Not valid ID");

    })

    it('Should return a 404 response if the product is not found', async () => {
        const productID = 10;
        const response = await request(server).get(`/api/products/${productID}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found');
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Not valid ID");

    })

    it('Should get a JSON response for a valid ID', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty('errors');
        expect(response.body).toHaveProperty('data');
    })

})

describe('PUT /api/products/:id', () => {
    it('Should display validation errors', async () => {

        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should validate that price is greater than 0', async () => {

        const response = await request(server).put('/api/products/1').send({
            name: 'Testing 1',
            price: -200,
            availability: true
        })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Price must be greater than 0');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })
    it('Should return a 404 response for a non-existent product', async () => {

        const response = await request(server).put('/api/products/300').send({
            name: 'Testing 1',
            price: 100,
            availability: true
        })
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return a 200 response and update the product', async () => {

        const response = await request(server).put('/api/products/1').send({
            name: 'Testing product update',
            price: 350,
            availability: true
        })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    })
})

describe('PATCH /api/products/:id', () => {
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).patch('/api/products/not-valid')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Not valid ID");

    })

    it('Should return a 404 response if product not found', async () => {
        const response = await request(server).patch('/api/products/3333')
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe("Product not found");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');


    })

    it('Should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');


    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Not valid ID");

    })

    it('Should return a 404 response for a non-existent product', async () => {
        const response = await request(server).delete('/api/products/1788')
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not exists');

    })

    it('Should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product deleted');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);

    })
})

