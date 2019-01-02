import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

class SolutionsPage extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: 0
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Nav tabs className="nav-pills nav-pills-rounded">
              <NavItem>
                <NavLink
                  className={this.state.activeTab === 0 ? 'active' : ''}
                  onClick={() => this.toggle(0)}>
                  Retail banking
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === 1 ? 'active' : ''}
                  onClick={() => this.toggle(1)}>
                  Corporate Banking
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === 2 ? 'active' : ''}
                  onClick={() => this.toggle(2)}>
                  Insurance
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === 3 ? 'active' : ''}
                  onClick={() => this.toggle(3)}>
                  Capital markets
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab.toString()}>
              <TabPane tabId="0">
                <p>
                  Build the bank of the future with Triniti’s api’s. Out of the
                  box support for CASA, Cards, Loans, Deposits, Transfers,
                  Payments, Recharges, Service Requests, PFM, Virtual Agent,
                  Rewards, Origination.
                </p>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Txn-moneymovement</td>
                        <td>Funds Transfer</td>
                        <td>Including to Loan Accounts and Cards</td>
                      </tr>
                      <tr>
                        <td>Txn-moneymovement</td>
                        <td>Bill Payment</td>
                        <td>
                          Adhoc as well as Favourite Billers as well as Cards
                        </td>
                      </tr>
                      <tr>
                        <td>Txn-recharge</td>
                        <td>Top Up / Recharge</td>
                        <td>
                          Recharge of Mobile, DTH and Data Card will be
                          supported and extracted.
                        </td>
                      </tr>
                      <tr>
                        <td>Qry-Balanceenquiry</td>
                        <td>Balance Enquiry</td>
                        <td>
                          Enquire about account balance, card balances,
                          outstanding etc
                        </td>
                      </tr>
                      <tr>
                        <td>Qry-transaction-spend</td>
                        <td>Spend Query</td>
                        <td>
                          Used to enquire how much one spent. e.g. how much did
                          i spend on travel last month.
                        </td>
                      </tr>
                      <tr>
                        <td>Qry-transaction-history</td>
                        <td>Transaction history</td>
                        <td>
                          This is used when user asks to list his transactions
                          or particular months statement. e.g. show me
                          transactions on my visa card last 10 days
                        </td>
                      </tr>
                      <tr>
                        <td>Qry-Transaction-Check</td>
                        <td>Transaction Check</td>
                        <td>
                          This intent is provided when user checks for a
                          particular transaction. e.g Have i received my salary
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3>Universal Entities</h3>
                <p>
                  The following special entities are applicable to all Intents
                  (Excluding FAQ and Small Talk)
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>Entity</td>
                        <td>Purpose</td>
                        <td>Comment</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sys.Cancellation</td>
                        <td>
                          This signifies that user may wish to cancel whatever
                          process in is currently in. This is extracted only
                          when within a transaction.
                        </td>
                        <td>Your bot to provide Local lingo</td>
                      </tr>
                      <tr>
                        <td>Sys.Confirmation</td>
                        <td>
                          This signifies that user may wish to confirm to a bot
                          that is asking for confirmation to proceed with a
                          transaction. This is extracted only when within a
                          transaction.
                        </td>
                        <td>Your bot to provide Local lingo</td>
                      </tr>
                      <tr>
                        <td>Sys.Affirmation</td>
                        <td>
                          This is similar to the above, but this is used for
                          confirming intermediate steps. i.e “Do you want to use
                          your savings account” API must be called with only of
                          these as as expected entities
                        </td>
                        <td>Your bot to provide Local lingo</td>
                      </tr>
                      <tr>
                        <td>Sys.Negation</td>
                        <td>
                          This is returned when user says something that is
                          negating the purpose. “I don’t want to transfer to
                          amit”
                        </td>
                        <td>Your bot to provide Local Lingo</td>
                      </tr>
                      <tr>
                        <td>Sys.Profanity</td>
                        <td>
                          This is returned when user uses unparliamentary
                          language.
                        </td>
                        <td>Your bot to provide Local lingo</td>
                      </tr>
                      <tr>
                        <td>Any.Input</td>
                        <td>
                          This entity is to be used by the bot when it is
                          expecting a input that is not to be validated in any
                          way. in this situation, the system does not even check
                          for context change, spelling, etc.
                        </td>
                        <td>can be used for comments, narrations etc</td>
                      </tr>
                      <tr>
                        <td>Any.*</td>
                        <td>
                          This is used to extract dynamic entities that are
                          creatable by the bot during runtime. Such entities are
                          extracted as user entered. However context change etc
                          is detected in such cases.
                        </td>
                        <td>
                          Can be used for reference numbers and other ad hoc
                          entities that are not required to be extracted in
                          opening statement
                        </td>
                      </tr>
                      <tr>
                        <td>enum.*</td>
                        <td>
                          This is used to communicate dynamic dictionary
                          entities on the fly. it can be used it many places
                          where the dictionary values changes based on the user
                          profile (nicknames) or when dynamic options are
                          provided to the user to select from, and user may type
                          in the choice (or speak in using alexa)
                        </td>
                        <td>
                          This is under development. will be available in a
                          later release of Triniti Unified API
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPane>
              <TabPane tabId="1">
                Build low cost, customer centric digital channels with out of
                the box support for Current Accounts, Loans, Trade Finance,
                Treasury, Transfers, Payments, Service Requests, Virtual Agent,
                Origination.
              </TabPane>
              <TabPane tabId="2">
                Customer experience ( text from lemonade to rephrase) with out
                of the box support for Origination, Claims Processing, Policy
                Management, Premium Payments, Service Requests, Virtual Agent.
              </TabPane>
              <TabPane tabId="3">
                Build the next generation brokerage with Triniti API with out of
                the box support for stock quotes, market information, portfolio,
                orders, equities, mutual funds, service requests, virtual agent,
                origination.
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    )
  }
}

export default SolutionsPage
