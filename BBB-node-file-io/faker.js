const faker = require('faker')
// const N = 30
const N = 2000
const fs = require('fs')
const record = () => {
  // faker.fake(
  //   '{{name.lastName}},{{name.lastName}},{{address.city}},{{address.county}},{{address.zipCode}},{{hacker.adjective}}\n'
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.address.city(),
    faker.address.state(),
    faker.address.zipCode(),
    faker.hacker.adjective()
  ]
}
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

let workers = []
let written = 0
if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess () {
  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`)
    const worker = cluster.fork()
    worker.on('message', msg => {
      if (msg === 'done') {
        written += 1
      }
      if (written % 2000 === 0) {
        console.log(`written=${written}`)
      }
      if (written >= N) {
        console.log('all done')
        process.exit()
      }
    })
    workers.push(worker)
  }
  for (let i = 0; i < N; i++) {
    const workerId = i % numCPUs
    const worker = workers[workerId]
    worker.send(i)
  }
}

function childProcess () {
  const writer = fs.createWriteStream('out.csv', { flags: 'a' })
  console.log(`Worker ${process.pid} started`)
  process.on('message', message => {
    const msg = record().join(',') + '\n'
    writer.write(msg, () => {
      // signal writing is done for each entry
      process.send('done')
    })
  })
}