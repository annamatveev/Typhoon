import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import CreditCard from 'components/CreditCard';

function Info({ loading, error, txns, places }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    return <div>Something went wrong</div>;
  }

  if (txns !== false) {
    return (
      <div>
        {txns.map((card) => (
          <CreditCard key={card.accountNumber} creditCardTransactions={card.txns} places={places}/>
        ))}
      </div>
    );
  }

  return null;
}

Info.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  txns: PropTypes.any,
  places: PropTypes.any,
};

export default Info;
