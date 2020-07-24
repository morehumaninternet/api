// tslint:disable:no-let
// tslint:disable:no-expression-statement
import { expect } from 'chai'
import * as request from 'supertest'
import streamClient from '../streamClient'
import server from '../server'


function clearStream() {

}


describe('end-to-end', () => {

  let app: any
  let normalUserAgent: request.SuperTest<request.Test>
  let maintainerAgent: request.SuperTest<request.Test>
  let notLoggedInAgent: request.SuperTest<request.Test>

  // before(() => seed(db))
  // before(() => app = server.listen(5005))
  // before(() => {
  //   normalUserAgent = request.agent(app)
  //   maintainerAgent = request.agent(app)
  //   notLoggedInAgent = request.agent(app)
  // })

  // after(() => app && app.close())
  // after(() => db.destroy()) // Leave the database contents alone in case these are useful to inspect after tests have run



})
