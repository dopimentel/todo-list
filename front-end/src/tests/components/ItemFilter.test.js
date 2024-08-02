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

test('renders TaskFilter component', () => {
  const dropdownElement = screen.getByRole('combobox');
  expect(dropdownElement).toBeInTheDocument();
});

test('changes filter when a different option is selected', () => {
  const dropdownElement = screen.getByRole('combobox');
  fireEvent.change(dropdownElement, { target: { value: 'checked' } });
  expect(dropdownElement.value).toBe('checked');
});

test('filters tasks when a different option is selected', () => {
  const inputElement = screen.getByRole('textbox');
  const addButton = screen.getByRole('button');
  const dropdownElement = screen.getByRole('combobox');

  fireEvent.change(inputElement, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);
  fireEvent.change(dropdownElement, { target: { value: 'checked' } });

  waitFor(() => {
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
  });
});
