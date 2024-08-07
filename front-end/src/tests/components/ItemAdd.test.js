import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TaskProvider } from '../../context/taskContext';
import App from '../../App';

const renderWithContext = (component) => {
  return render(
    <TaskProvider>
      {component}
    </TaskProvider>,
  );
};

beforeEach(() => {
  renderWithContext(<App />);
});

it('renders ItemAdd component', () => {
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

it('adds a new task when the Add button is clicked', async () => {
  const inputElement = screen.getByRole('textbox');
  const addButton = screen.getByRole('button');

  fireEvent.change(inputElement, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  waitFor(() => {
    expect(inputElement.value).toBe('');
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
