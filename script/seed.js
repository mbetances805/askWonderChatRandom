const db = require('../server/db')
const {User, Merchant, EventManager} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const merchants = await Promise.all([
    Merchant.create({
      merchantName: 'Doux Supper Club',
      merchantAddress: '445 Lenox Ave, New York, NY 10036',
      merchantPhoneNumber: '212-333-3333',
      merchantStatus: 'Active'
    }),
    Merchant.create({
      merchantName: 'Pinks',
      merchantAddress: '4457 Lexington Ave, New York, NY 10026',
      merchantPhoneNumber: '212-335-3333',
      merchantStatus: 'Active'
    }),
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', merchantId: '1'}),
    User.create({email: 'murphy@email.com', password: '123', merchantId: '2'})
  ])
  
  const eventManager = await Promise.all([
    EventManager.create({
      eventManagerName: 'eventbrite',
      eventManagerStatus: 'Active',
      eventManagerUrl: 'https://www.eventbriteapi.com',
      eventManagerPostPath: '/v3/events/?token='
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${merchants.length} merchants`)
  console.log(`seeded ${eventManager.length} event managers`)
  console.log(`seeded successfully`)
  
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })


console.log('seeding...')
