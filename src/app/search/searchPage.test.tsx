import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import SearchPage from './page';

describe('Search Page', () => {
  it('is accessible', async () => {
    const { container } = render(
      <SearchPage />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test('renders Search Page', () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    expect(inputElement).toBeInTheDocument();
  });

  test('shows loading state', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'my search term');

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('shows error state', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'error');

    expect(await screen.findByText('An error occurred, please try again.')).toBeInTheDocument();
  });

  test('shows empty state', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'no results');

    expect(await screen.findByText('No products found')).toBeInTheDocument();
  });

  test('shows results', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'peppermint');

    expect(await screen.findByText('3 products found')).toBeInTheDocument();
    expect(await screen.findAllByText('Peppermint')).toHaveLength(3);
  });

  test('highlights the search term inside result', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'peppermint');

    const resultElement = await screen.findAllByText('Peppermint');
    const firstElement = resultElement[0];
    expect(firstElement).toHaveClass('bg-pink-200');
  });

  test('shows a hover style on product result', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    await userEvent.type(inputElement, 'peppermint');

    const resultElement = await screen.findByText('Chocolate');
    const firstElement = resultElement.parentElement as HTMLElement;
    userEvent.hover(firstElement);
    expect(firstElement).toHaveClass('hover:bg-pink-50');
  });

  test('animates when results are shown', async () => {
    render(<SearchPage />);
    const inputElement = screen.getByPlaceholderText('Search for your favorite candy');
    const resultsElement = screen.getByTestId('search-results');

    expect(resultsElement).toHaveClass('max-h-0');
    await userEvent.type(inputElement, 'peppermint');
    setTimeout(() => {
      expect(resultsElement).toHaveClass('max-h-[50vh]');
    }, 750);
  });
});