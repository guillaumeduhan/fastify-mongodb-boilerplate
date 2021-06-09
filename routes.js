async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection('listingsAndReviews')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/listings', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get('/listings/:id', async (request, reply) => {
    const result = await collection.findOne({ _id: request.params.id.toString() })
    if (result === null) {
      throw new Error('Invalid value')
    }
    return result
  })
}

module.exports = routes