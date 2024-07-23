/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import User from '#models/user'
import RegisterValidator from '#validators/RegisterValidator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const { PIN, email } = request.only(['PIN', 'email'])

    const checkUserExistence = async (field: string, value: string) => {
      const existingUser = await User.findBy(field, value)
      if (existingUser) {
        throw new Error(`User with that ${field} already exists`)
      }
    }

    try {
      await checkUserExistence('PIN', PIN)
      await checkUserExistence('email', email)

      const data = await request.validate({
        schema: RegisterValidator.schema,
        messages: RegisterValidator.messages,
      })

      const user = await User.create(data)
      return response.status(200).json({ message: 'User successfully created', user })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
