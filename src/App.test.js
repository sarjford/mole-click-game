import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders game board', () => {
  render(<App />);
  const gameBoard = screen.getByTestId('game-board');
  expect(gameBoard).toBeInTheDocument();
});
