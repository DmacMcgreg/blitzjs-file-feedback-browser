import changePassword from "app/auth/mutations/changePassword"
import { m } from "framer-motion"
import db from "./index"

// Load Chance
var Chance = require("chance")

// Instantiate Chance so it can be used
var chance = new Chance()

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const seedUsers = async () => {
  for (let i = 2; i < 12; i++) {
    await db.user.create({
      data: { id: i, name: chance.name(), email: chance.email() },
    })
  }
}
const seedFeedback = async () => {
  for (let i = 1; i < 11; i++) {
    await db.feedback.create({
      data: {
        title: chance.name(),
        userId: chance.integer({ min: 1, max: 10 }),
        text: chance.paragraph(),
      },
    })
  }
}

const seed = async () => {
  //await seedUsers()
  console.log("seeded users")
  await seedFeedback()
}

export default seed
