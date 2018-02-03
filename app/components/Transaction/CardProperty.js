import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const TransactionPropertyWrapper = styled.div`
  margin: 10px;
  text-align: center;
`;

const TransactionPropertyNameWrapper = styled.div`
  text-transform: uppercase;
  color: #6e7175;
  font-size: 10px;
`

;const TransactionPropertyValueWrapper = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  color: #6e7175;
  font-size: 15px;
`;

const CardProperty = ({ name, value }) => (
  <TransactionPropertyWrapper>
    <TransactionPropertyValueWrapper>
      {value}
    </TransactionPropertyValueWrapper>
    <TransactionPropertyNameWrapper>
      < FormattedMessage
        {...name}
      />
    </TransactionPropertyNameWrapper>
  </TransactionPropertyWrapper>
);

CardProperty.propTypes = {
  name: PropTypes.object,
  value: PropTypes.string,
};

export default CardProperty;
