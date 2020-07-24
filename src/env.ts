if (!process.env.MORE_HUMAN_INTERNET_ENV) {
  throw new Error('Must set MORE_HUMAN_INTERNET_ENV')
}

require('dotenv').config({ path: `.env.${process.env.MORE_HUMAN_INTERNET_ENV}` })

export function getString(key: string): Maybe<string> {
  return process.env[`MORE_HUMAN_INTERNET_${key}`]
}

export function getInt(key: string, fallback: number): number {
  const value = getString(key)
  if (typeof value === 'string') {
    return parseInt(value) || fallback
  }
  return fallback
}
