import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/HomePage';
import TyphoonProvider from 'containers/TyphoonProvider/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Typhoon"
        defaultTitle="Typhoon"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <TyphoonProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </TyphoonProvider>
      <Footer />
    </AppWrapper>
  );
}
