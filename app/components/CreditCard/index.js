import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'react-table/react-table.css';
import CompaniesChart from 'components/CompaniesChart';
import TransactionsTable from 'components/TransactionsTable';
import MonthlySpending from 'components/MonthlySpending';

const CreditCardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-wrap: wrap;
  margin: auto;
  z-index: 99;
`;




const CreditCard = ({ creditCardTransactions, places }) => {
  return (<CreditCardWrapper>
    <CompaniesChart creditCardTransactions={creditCardTransactions} places={places}/>
    {/*<TransactionsTable creditCardTransactions={creditCardTransactions} />*/}
    {/*<MonthlySpending creditCardTransactions={creditCardTransactions} />*/}
  </CreditCardWrapper>);
};

CreditCard.propTypes = {
  creditCardTransactions: PropTypes.array,
};

export default CreditCard;
