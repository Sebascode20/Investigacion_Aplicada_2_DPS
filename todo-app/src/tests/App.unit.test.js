import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../../App';

describe('To-Do App - Unit Tests', () => {
  test('Agrega una tarea correctamente', () => {
    const { getByTestId, queryByText } = render(<App />);
    const input = getByTestId('input-task');
    const button = getByTestId('btn-add');

    fireEvent.changeText(input, 'Comprar pan');
    fireEvent.press(button);

    expect(queryByText('Comprar pan')).not.toBeNull();
  });

  test('No agrega tarea vacía', () => {
    const { getByTestId, queryAllByTestId } = render(<App />);
    const button = getByTestId('btn-add');
    fireEvent.press(button);

    expect(queryAllByTestId(/^btn-delete-/).length).toBe(0);
  });
});
