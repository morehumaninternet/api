import { first } from 'lodash'
import { IRouterContext } from 'koa-router'
import * as uuid from 'node-uuid'
import * as users from './users'



const cookieKey = 'more-human-internet-api:session'


// TODO: store these somewhere more permanent and expire them and all that
const sessions = new Map<string, string>()

const store = {
  async get(key: string): Promise<Maybe<string>> {
    return sessions.get(key)
  },
  async set(key: string, userId: string): Promise<void> {
    sessions.set(key, userId) // tslint:disable-line:no-expression-statement
  },
  async destroy(key: string): Promise<void> {
    sessions.delete(key) // tslint:disable-line:no-expression-statement
  }
}

export async function createSessionForUser(ctx: IRouterContext, userId: string): Promise<void> {
  const sessionKey = uuid.v4()
  return (
    await store.set(sessionKey, userId),
    ctx.set('Set-Cookie', `${cookieKey}=${sessionKey}; Max-Age=86400000`) // TODO: Please some security person analyze this
  )
}

function extractSessionKeyFromCookie(cookie: Maybe<string>): Maybe<string> {
  if (!cookie) return
  const matchingCookie = cookie.split(';').map(s => s.trim()).find(s => s.startsWith(cookieKey))
  if (!matchingCookie) return
  const [, sessionKey] = matchingCookie.split('=')
  return sessionKey
}

async function getLoggedInUserFromSessionKey(sessionKey: string): Promise<Maybe<UserOutgoingPayload>> {
  const userId = await store.get(sessionKey)
  return userId ? await users.getUserById(userId) : null
}

export async function getLoggedInUserFromCookie(cookie: Maybe<string>): Promise<Maybe<UserOutgoingPayload>> {
  const sessionKey = extractSessionKeyFromCookie(cookie)
  if (sessionKey) return getLoggedInUserFromSessionKey(sessionKey)
}

export async function removeSessionOfCookie(cookie: Maybe<string>): Promise<void> {
  const sessionKey = extractSessionKeyFromCookie(cookie)
  if (sessionKey) return store.destroy(sessionKey)
}

