import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import messages from './messages';
import CardProperty from './CardProperty';

const TransactionWrapper = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  width: 450px;
  border-radius: 10px;
  border: 2px solid #2eaee5;
  overflow: hidden;  
    
  transition: transform .5s;
  &:hover,
  &:focus {
    transform: scale3d(1.05, 1.05, 1);
    transition-duration: 0.3s;
  }
`;

const TransactionInfoWrapper = styled.div`
  display: flex;       
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  width: 100%;
`;

const TransactionNameWrapper = styled.div`
  background-color: #2eaee5;
  text-transform: uppercase;
  color: white;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
  margin: auto;
  width: 100%;
`;

const Transaction = ({ transaction }) => (
  <TransactionWrapper>
    <TransactionNameWrapper>
      {transaction.name}
    </TransactionNameWrapper>
    <TransactionInfoWrapper>
      <CardProperty name={messages.amount} value={transaction.originalAmount + ' ' + transaction.originalCurrency} />
      <CardProperty name={messages.company} value={transaction.description} />
      <CardProperty name={messages.date} value={transaction.date} />
    </TransactionInfoWrapper>
  </TransactionWrapper>
);

Transaction.propTypes = {
  transaction: PropTypes.object,
};

export default Transaction;
