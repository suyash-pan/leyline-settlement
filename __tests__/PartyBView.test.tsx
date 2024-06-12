import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PartyBView from '../components/ui/PartyBView';

describe('PartyBView', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders current amount from local storage', () => {
    localStorage.setItem('amount', '200');
    render(<PartyBView />);
    expect(screen.getByText('200')).toBeTruthy();
  });

  it('updates response in local storage when Agree is clicked', () => {
    render(<PartyBView />);
    const agreeButton = screen.getByText(/Agree/i);
    fireEvent.click(agreeButton);
    const response = JSON.parse(localStorage.getItem('response') || '{}');
    expect(response).toEqual({ agreed: true, amount: 0 });
  });

  it('updates response in local storage when Dispute is clicked', () => {
    render(<PartyBView />);
    const disputeButton = screen.getByText(/Dispute/i);
    fireEvent.click(disputeButton);
    const response = JSON.parse(localStorage.getItem('response') || '{}');
    expect(response).toEqual({ agreed: false, amount: 0 });
  });

  it('fetches and updates the amount from local storage periodically', async () => {
    render(<PartyBView />);
    localStorage.setItem('amount', '300');
    await waitFor(() => {
      expect(screen.getByText('300')).toBeTruthy();
    });
  });
});
