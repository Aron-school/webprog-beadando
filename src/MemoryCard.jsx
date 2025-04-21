import React from 'react';

const Card = ({ value, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: isFlipped ? '#f4b042' : '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        border: '1px solid #000',
        cursor: 'pointer',
      }}
    >
      {isFlipped ? value : ''}
    </div>
  );
};

export default Card;
