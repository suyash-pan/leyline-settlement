import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PartyAView from '../components/ui/PartyAView';

describe('PartyAView', () => {
  const mockOnSettlementAgreed = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSettlementAgreed.mockClear();
  });

  it('renders SettlementForm and PartyBResponse components', () => {
    render(<PartyAView onSettlementAgreed={mockOnSettlementAgreed} />);
    expect(screen.getByPlaceholderText(/Enter settlement amount/i)).toBeTruthy();
  });

  it('submits a new amount and updates local storage', () => {
    render(<PartyAView onSettlementAgreed={mockOnSettlementAgreed} />);
    
    const input = screen.getByPlaceholderText(/Enter settlement amount/i);
    const submitButton = screen.getByText(/Submit/i);
    
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(submitButton);
    
    expect(localStorage.getItem('amount')).toBe('100');
    expect(localStorage.getItem('response')).toBe(null);
  });

  it('fetches and displays response from local storage', async () => {
    const response = { agreed: true, amount: 100 };
    localStorage.setItem('response', JSON.stringify(response));

    render(<PartyAView onSettlementAgreed={mockOnSettlementAgreed} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Agreed: 100/i)).toBeTruthy();
    });
  });

  it('calls onSettlementAgreed when response is agreed and amount changes', async () => {
    const response = { agreed: true, amount: 150 };
    localStorage.setItem('response', JSON.stringify(response));

    render(<PartyAView onSettlementAgreed={mockOnSettlementAgreed} />);
    
    await waitFor(() => {
      expect(mockOnSettlementAgreed).toHaveBeenCalledWith(150);
    });
  });
});
