
import React from 'react';

const MineCell = ({ cell, onClick }) => {
    return (
        <div
        onClick={onClick}
        style={{
            width: 30,
            height: 30,
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cell.isRevealed ? '#ddd' : '#aaa',
            cursor: 'pointer',
        }}
    >
    {cell.isRevealed && (cell.isMine ? '💣' : cell.neighborMines > 0 ? cell.neighborMines : '')}
    </div>
    );
};

export default MineCell;
