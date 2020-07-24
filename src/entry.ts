import { getInt } from './env'
import server from './server'

const port = getInt('PORT', 5004)

server.listen(port) // tslint:disable-line:no-expression-statement

console.log(`morehumaninternet api listening on ${port}`) // tslint:disable-line:no-expression-statement
