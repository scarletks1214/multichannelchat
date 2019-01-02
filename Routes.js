import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import AuthorizedRoute from './routes/AuthorizedRoute'
import UnauthorizedRoute from './routes/UnauthorizedRoute'
import WorkspaceRoute from './routes/WorkspaceRoute'

import { isDoc, isAdmin } from './utils'

import IntentsCreatePage from './pages/intents/create'
import IntentsEditPage from './pages/intents/edit'
import IntentsListPage from './pages/intents/list'
import WorkspaceCreatePage from './pages/workspaces/create'
import WorkspaceListPage from './pages/workspaces/list'

import EntityListPage from './pages/entities/list'
import ChannelsListPage from './pages/channels/list'

import AnalyticsPage from './pages/analytics'

import LoginPage from './pages/login'
import CreateAccountPage from './pages/create-account'
import VerificationPage from './pages/verification'
import UserProfile from './pages/user-profile'
import OverviewPage from './pages/doc/Overview'
import Architecture from './pages/doc/Architecture'
import DemoPage from './pages/doc/Demo'
import ApiPage from './pages/doc/ApiPage'
import KeyPage from './pages/doc/KeyPage'
import HowToPage from './pages/doc/HowToPage'
import SolutionsPage from './pages/doc/SolutionsPage'

import FaqPage from './pages/faqs'

import SmallTalkPage from './pages/small-talk'

import { isWorkspaceSet } from './utils/WorkspaceManager'

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        isDoc() ? (
          <Redirect to="/overview" />
        ) : isWorkspaceSet() ? (
          <Redirect to="/intents" />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />

    <AuthorizedRoute exact path="/dashboard" component={WorkspaceListPage} />
    <WorkspaceRoute exact path="/intents" component={IntentsListPage} />
    <WorkspaceRoute path="/intents/new" component={IntentsCreatePage} />
    <WorkspaceRoute path="/intents/all" component={IntentsListPage} />
    <WorkspaceRoute path="/intents/:intentId" component={IntentsEditPage} />
    <AuthorizedRoute exact path="/workspaces" component={WorkspaceListPage} />
    <AuthorizedRoute path="/workspaces/new" component={WorkspaceCreatePage} />
    <AuthorizedRoute path="/workspaces/all" component={WorkspaceListPage} />
    <WorkspaceRoute path="/entities" component={EntityListPage} />
    <WorkspaceRoute path="/entities/all" component={EntityListPage} />
    <WorkspaceRoute path="/faqs" component={FaqPage} />
    <AuthorizedRoute exact path="/profile" component={UserProfile} />
    <WorkspaceRoute path="/smalltalk" component={SmallTalkPage} />
    <WorkspaceRoute path="/channels" component={ChannelsListPage} />

    <UnauthorizedRoute path="/register" component={CreateAccountPage} />
    <UnauthorizedRoute path="/login" component={LoginPage} />
    <Route path="/verify/:verifyToken" component={VerificationPage} />

    <Route path="/analytics" component={AnalyticsPage} />

    {isDoc() && <Route path="/overview" component={OverviewPage} />}
    {isDoc() && <Route path="/architecture" component={Architecture} />}
    {isDoc() && <Route path="/solutions" component={SolutionsPage} />}
    {isDoc() && <Route path="/demo" component={DemoPage} />}
    {isDoc() && <Redirect exact from="/docs" to="/docs/api" />}
    {isDoc() && <Route path="/docs/api" component={ApiPage} />}
    {isDoc() && <Route path="/docs/key" component={KeyPage} />}
    {isDoc() && <Route path="/docs/howto" component={HowToPage} />}

    {isAdmin() && <Route path="/overview" component={OverviewPage} />}
    {isAdmin() && <Route path="/architecture" component={Architecture} />}
    {isAdmin() && <Route path="/solutions" component={SolutionsPage} />}
    {isAdmin() && <Route path="/demo" component={DemoPage} />}
    {isAdmin() && <Route path="/docs/howto" component={HowToPage} />}

    {/* <Route component={EmptyPage} /> */}
  </Switch>
)

export default Routes
