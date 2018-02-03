import React from "react";
import { Helmet } from 'react-helmet';
import Info from "../../components/Info";
import PropTypes from 'prop-types';
import Header from 'components/Header';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
   min-height: 89vh;
`;


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { loading, error, data } = this.props;
    const DataListProps = {
      loading,
      error,
      txns: data.get('txns'),
      places: data.get('places'),
    };

    return (
      <HomePageWrapper>
        <Helmet>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Header />
        <div>
          <Info {...DataListProps} />
        </div>
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
  ])
};


export default HomePage;
