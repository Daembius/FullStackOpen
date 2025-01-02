const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}
