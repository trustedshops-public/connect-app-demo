import { h } from 'preact'
import Router, { Route } from 'preact-router'
import { FC } from 'preact/compat'
import { DatabaseContainer } from './database-container/DatabaseContainer'
import modules from './UI/modules'

export const App: FC = () => {
  return (
    <DatabaseContainer>
      <Router>
        {modules.map(item => (
          <Route {...(item.routeProps as any)} key={item.name} />
        ))}
      </Router>
    </DatabaseContainer>
  )
}
