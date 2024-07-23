/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/Http/auth_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [AuthController, 'register']).as('api.auth.register')
        router.post('/login', [AuthController, 'login']).as('api.auth.login')
      })
      .prefix('auth')
  })
  .prefix('api/v1')
