import React, { useState, useEffect } from 'react';
import Card from './MemoryCard';

const generateCards = () => {
  const values = Array.from({ length: 8 }, (_, i) => i + 1);
  const cardValues = [...values, ...values];
  cardValues.sort(() => Math.random() - 0.5);
  return cardValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0); // Timer state
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;

    // Start the timer on the first click
    if (!isRunning) {
      setIsRunning(true);
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.value === secondCard.value) {
        setMatchedPairs(matchedPairs + 1);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: card.isMatched }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs(0);
    setGameWon(false);
    setTime(0); // Reset timer
    setIsRunning(false); // Stop timer until the first click
  };

  useEffect(() => {
    if (matchedPairs === cards.length / 2 && !gameWon) {
      setGameWon(true);
      setIsRunning(false); // Stop timer
      alert(`Gratulálok, megtaláltál minden párt! Idő: ${time} másodperc`);
    }
  }, [matchedPairs, gameWon, cards, time]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h2>Memory Game</h2>
      <div style={{ marginBottom: '20px' }}>
        <p>Eltelt idő: {time} másodperc</p>
        <p>Megtalált párok: {matchedPairs} / {cards.length / 2}</p>
      </div>
      <button onClick={resetGame} style={{ marginBottom: '20px' }}>
        Újrakezdés
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
