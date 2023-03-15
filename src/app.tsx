import { h } from 'preact'
import Router, { Route } from 'preact-router'
import { FC } from 'preact/compat'
import { useMockDataBaseForBaseLayer } from './database-container/useMockDataBaseForBaseLayer'
import modules from './UI/modules'

export const App: FC = () => {
  useMockDataBaseForBaseLayer()
  return (
    <Router>
      {modules.map(item => (
        <Route {...(item.routeProps as any)} key={item.name} />
      ))}
    </Router>
  )
}
