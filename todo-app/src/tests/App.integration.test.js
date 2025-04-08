import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';

describe('To-Do App - Integration Test', () => {
  test('Agrega y elimina una tarea correctamente', async () => {
    const { getByTestId, queryByText, queryByTestId } = render(<App />);
    
    fireEvent.changeText(getByTestId('input-task'), 'Estudiar React Native');
    fireEvent.press(getByTestId('btn-add'));

    expect(queryByText('Estudiar React Native')).toBeTruthy();

    const deleteButton = queryByTestId(/^btn-delete-/);
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(queryByText('Estudiar React Native')).toBeNull();
    });
  });
});
