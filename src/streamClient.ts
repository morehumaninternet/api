import * as assert from 'assert'
import { getString, getInt } from './env'
import { connect } from 'getstream'

const GETSTREAM_KEY = getString('GETSTREAM_KEY')
const GETSTREAM_SECRET = getString('GETSTREAM_SECRET')
const GETSTREAM_APP_ID = getString('GETSTREAM_APP_ID')
const GETSTREAM_LOCATION = getString('GETSTREAM_LOCATION')
const GETSTREAM_TIMEOUT = getInt('GETSTREAM_TIMEOUT', 15000)

assert.ok(GETSTREAM_KEY)
assert.ok(GETSTREAM_SECRET)
assert.ok(GETSTREAM_APP_ID)

const client = connect(
  GETSTREAM_KEY!,
  GETSTREAM_SECRET!,
  GETSTREAM_APP_ID!,
  {
    location: GETSTREAM_LOCATION || 'us-east-1',
    timeout: GETSTREAM_TIMEOUT,
  }
)

export default client
