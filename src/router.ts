import * as Router from 'koa-router'
import * as send from 'koa-send'
import { readdirSync } from 'fs'
import * as middleware from './middleware'
import * as handlers from './handlers'


const v1Router = new Router()
  .get('/session', handlers.checkSession)
  .post('/session', handlers.createSession)
  .del('/session', handlers.delSession)
  .post('/card', handlers.createCard)

const router = new Router()
  .get(`/health-check`, ({ response }) => Object.assign(response, { status: 200, body: 'OK' }))
  .redirect('/', '/docs.html')
  .use('/v1', middleware.attachStaffMemberFromSession, v1Router.routes(), v1Router.allowedMethods())


// tslint:disable-next-line:no-expression-statement
readdirSync(process.cwd() + '/public').forEach(fileName =>
  router.get('/' + fileName, ctx => send(ctx, `/public/${fileName}`)))

export default router
