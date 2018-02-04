import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const precisionRound = (number, precision) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

class TransactionsListView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { data } = this.props;
    const mergedTxns = data.get('txns').reduce((accumulator, card) => accumulator.concat(card.txns), []);
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
        data={mergedTxns}
        columns={columns}
      />
    );
  }
}

TransactionsListView.propTypes = {
  data: PropTypes.array,
  onLoad: PropTypes.func.isRequired,
};

export default TransactionsListView;
