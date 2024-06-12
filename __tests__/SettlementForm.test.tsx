import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettlementForm from '../components/ui/SettlementForm';

describe('SettlementForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders input with current amount', () => {
    render(<SettlementForm currentAmount={200} onSubmit={mockOnSubmit} />);
    expect(screen.getByDisplayValue('200')).toBeTruthy();
  });

  it('calls onSubmit with the new amount when form is submitted', () => {
    render(<SettlementForm currentAmount={200} onSubmit={mockOnSubmit} />);
    
    const input = screen.getByDisplayValue('200');
    const submitButton = screen.getByText(/Submit/i);
    
    fireEvent.change(input, { target: { value: '250' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith(250);
  });
});
