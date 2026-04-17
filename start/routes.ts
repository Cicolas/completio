/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('complete', [controllers.Completion, 'complete'])

    router
      .group(() => {
        router.get('signup', [controllers.user.NewAccount, 'create'])
        router.post('signup', [controllers.user.NewAccount, 'store'])

        router.get('login', [controllers.user.Session, 'create'])
        router.post('login', [controllers.user.Session, 'store'])
      })
      .prefix('auth')
      .use(middleware.guest())

    router
      .group(() => {
        router.post('logout', [controllers.user.Session, 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('api')

router.on('/').renderInertia('home', {}).as('home')
