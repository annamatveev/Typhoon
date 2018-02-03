import ReactTable from 'react-table';
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const precisionRound = (number, precision) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};


const TransactionsTable = ({ creditCardTransactions }) => {
  const columns = [
    {
      Header: 'Company',
      accessor: 'description',
    },
    {
      Header: 'Date',
      id: 'date',
      accessor: (r) => (new Date(r.date)).toLocaleDateString('he-IL'),
    },
    {
      Header: 'Year',
      id: 'year',
      accessor: (r) => {
        const d = new Date(r.date);
        return `${d.getYear() + 1900}`;
      },
    },
    {
      Header: 'Month',
      id: 'month',
      accessor: (r) => {
        const d = new Date(r.date);
        return `${d.getMonth() + 1}`;
      },
    },
    {
      Header: 'Amount',
      accessor: 'chargedAmount',
      aggregate: (values) => precisionRound(values.reduce((a, b) => a + b, 0), 2),
    },
  ];
  return (
    <ReactTable
      filterable
      multiSort
      pivotBy={['description']}
      data={creditCardTransactions}
      columns={columns}
    />
  );
};

TransactionsTable.propTypes = {
  creditCardTransactions: PropTypes.array,
};

export default TransactionsTable;
