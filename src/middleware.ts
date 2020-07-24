import { IMiddleware, IRouterContext } from 'koa-router'
import * as sessions from './sessions'


export const attachStaffMemberFromSession: IMiddleware = (
  async (ctx: IRouterContext, next) => {
    const loggedInUser = await sessions.getLoggedInUserFromCookie(ctx.request.headers.cookie)

    if (loggedInUser) {
      Object.assign(ctx, { loggedInUser }) // tslint:disable-line:no-expression-statement
    }

    return next()
  }
)

export const trackRequests: IMiddleware = (
  async ({ response }: IRouterContext, next) => {

    /* tslint:disable:no-expression-statement */
    try { await next() } catch (err) {
      const status = err.status || 500
      Object.assign(response, { status, body: err.message })
      if (status >= 500) console.error(err)
    }
    /* tslint:enable:no-expression-statement */
  }
)
