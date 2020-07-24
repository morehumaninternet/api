export async function getUserById(userId: string): Promise<Maybe<UserOutgoingPayload>> {
  return {
    id: userId,
    username: 'random',
  }
}

export async function getUserByUserName(username: string) {
  return {
    id: 'ok',
    username
  }
}
