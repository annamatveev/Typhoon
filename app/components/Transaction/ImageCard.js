import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TransactionImageCardWrapper = styled.div`
  display: flex;  
  flex-direction: column;
  margin: 10px;
`;

const TransactionImageWrapper = styled.div`

`;

const TransactionNumWrapper = styled.div`
  margin: 10px;
  color: #454749;
  font-size: 13px;
  text-align: center;
`;

const ImageCard = ({ image, number }) => (
  <TransactionImageCardWrapper>
    <img src={image} />
    <TransactionNumWrapper>
      {number}
    </TransactionNumWrapper>
  </TransactionImageCardWrapper>
  )
;

ImageCard.propTypes = {
  image: PropTypes.string,
  number: PropTypes.string,
};

export default ImageCard;
