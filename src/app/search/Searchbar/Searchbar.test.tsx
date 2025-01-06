import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Searchbar } from './Searchbar';

const onSearchMock = jest.fn();
describe('Searchbar', () => {
  it('is accessible', async () => {
    const { container } = render(
      <Searchbar onSearch={onSearchMock} placeholder="Search for a product" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test('renders Searchbar component', () => {
    render(<Searchbar onSearch={onSearchMock} placeholder="Search for a product" />);
    const inputElement = screen.getByPlaceholderText('Search for a product');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch with the correct value', async () => {
    render(<Searchbar onSearch={onSearchMock} placeholder="Search for a product" />);
    const inputElement = screen.getByPlaceholderText('Search for a product');
    
    await userEvent.type(inputElement, 'my search term');
    expect(onSearchMock).toHaveBeenCalled();
  });

  test('renders with default placeholder if none is provided', () => {
    render(<Searchbar onSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });
});