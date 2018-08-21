import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Home, Console, About, Account, Alliance, Factions, Graphs, Maps, Players, SpaceInvaders } from './pages'
import Layout from './layout/layout'

const LayoutWithRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        <Layout>
          <Component/>
        </Layout>
      }
    />
  );
};

const Routes = () => (
  <Router>
    <Switch>
      <LayoutWithRoute exact path="/" component={Home} />
      <LayoutWithRoute path="/Console" component={Console} />
      <LayoutWithRoute path="/About" component={About} />
      <LayoutWithRoute path="/Account" component={Account} />
      <LayoutWithRoute path="/Alliance" component={Alliance} />
      <LayoutWithRoute path="/Factions" component={Factions} />
      <LayoutWithRoute path="/Graphs" component={Graphs} />
      <LayoutWithRoute path="/Maps" component={Maps} />
      <LayoutWithRoute path="/Players" component={Players} />
      <LayoutWithRoute path="/SpaceInvaders" component={SpaceInvaders} />
      <LayoutWithRoute component={Home} />
    </Switch>
  </Router>
);
export default Routes