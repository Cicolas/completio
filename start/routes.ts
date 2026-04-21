/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CompletionController = () => import('#controllers/completion_controller')
const NewAccountController = () => import('#controllers/user/new_account_controller')
const SessionController = () => import('#controllers/user/session_controller')

router
  .group(() => {
    router.post('complete', [CompletionController, 'complete'])

    router
      .group(() => {
        router.get('signup', [NewAccountController, 'create'])
        router.post('signup', [NewAccountController, 'store'])

        router.get('login', [SessionController, 'create'])
        router.post('login', [SessionController, 'store'])
      })
      .prefix('auth')
      .use(middleware.guest())

    router
      .group(() => {
        router.post('logout', [SessionController, 'destroy'])
      })
      .use(middleware.auth())
  })
  .use(middleware.apiResponse())
  .prefix('api')

router.get('/signup', ({ response }) => response.redirect().toPath('/api/auth/signup')).use(middleware.guest())
router.get('/login', ({ response }) => response.redirect().toPath('/api/auth/login')).use(middleware.guest())

router.on('/').renderInertia('home', {}).as('home')
