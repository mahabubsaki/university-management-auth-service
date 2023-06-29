import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.dbUri as string)
    app.listen(config.port, () => {
      console.log('Listening to ', config.port)
    })
  } catch (err) {
    console.log('failed to connect db', err)
  }
}
main()
