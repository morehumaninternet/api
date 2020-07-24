import { IRouterContext } from 'koa-router'
import { omit } from 'lodash'
import * as sessions from './sessions'
import * as streamClient from './streamClient'
import * as users from './users'


const fromBody = (ctx: IRouterContext, fieldName: string, type: 'string' | 'number' | 'boolean') => {
  const value = ctx.request.body[fieldName]
  if (!value || typeof value !== type) {
    throw { status: 400, message: `Body must include ${fieldName}, a ${type}` }
  }
  return value
}

const getPositiveIntegerParam = (ctx: IRouterContext, fieldName: string) => {
  const id = Number(ctx.params[fieldName])
  if (!id || id < 0 || Math.floor(id) !== id) {
    throw { status: 400, message: `provided ${fieldName} must be an integer > 0` }
  }

  return id
}

export async function createCard(ctx: IRouterContext) {
  console.log('here', ctx, streamClient)
  return Object.assign(ctx.response, { status: 200 })
}

export async function checkSession(ctx: IRouterContext): Promise<any> {
  const { loggedInUser } = ctx as any

  if (!loggedInUser) {
    return Object.assign(ctx.response, { status: 401 })
  } else {
    return Object.assign(ctx.response, { status: 200, body: omit(loggedInUser, 'id') })
  }
}

export async function createSession(ctx: IRouterContext): Promise<any> {
  const username: string = fromBody(ctx, 'username', 'string')
  const password: string = fromBody(ctx, 'password', 'string')

  const user = await users.getUserByUserName(username)
  if (!user) throw { status: 404, message: `No user (${username})` }

  const match = true
  // const match = await passwords.compare(password, user.hashed_password)

  if (match) {
    return (
      await sessions.createSessionForUser(ctx, user.id),
      Object.assign(ctx.response, { status: 200 })
    )
  } else {
    return Object.assign(ctx.response, { status: 401 })
  }
}

export async function delSession(ctx: IRouterContext): Promise<any> {
  return (
    await sessions.removeSessionOfCookie(ctx.request.headers.cookie),
    Object.assign(ctx.response, { status: 200 })
  )
}

