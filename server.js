'use strict'

const fastify = require('fastify')({
    logger: true
})

fastify.get('/:params', async (request, reply) => {
    return { hello: request.params || 'world' }
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()