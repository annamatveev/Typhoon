import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryPieChart from 'containers/CategoryPieChart';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
   min-height: 89vh;
`;

const Main = styled.div`
   margin-top: 64px;
`


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HomePageWrapper>
        <Helmet>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Header />
        <Main>
          <CategoryPieChart />
        </Main>
      </HomePageWrapper>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};


export default HomePage;
