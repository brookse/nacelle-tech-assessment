import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import ModalPage from './page';

describe('Modal Page', () => {
  it('is accessible', async () => {
    const { container } = render(
      <ModalPage />
    );
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test('modal is openable', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    expect(categoryButton).toBeInTheDocument();
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Salt Water Taffy')).toBeInTheDocument();
  });

  test('modal is closable with close button', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    const closeButton = within(modal).getByRole('button', {name: 'Close modal'});
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  test('modal is closable by clicking on backdrop', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    const backdrop = screen.getByRole('presentation');
    expect(backdrop).toBeInTheDocument();
    expect(modal).toBeInTheDocument();

    await userEvent.click(backdrop);
    expect(modal).not.toBeInTheDocument();
  });

  test('modal is closable with escape key', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    await userEvent.type(modal, '{Escape}');
    expect(modal).not.toBeInTheDocument();
  });

  test('modal is tabbable', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    const closeButton = within(modal).getByRole('button', {name: 'Close modal'});

    await userEvent.tab();
    expect(document.activeElement).toBe(closeButton);
  });

  test('does not allow body scroll when modal is open', async () => {
    render(<ModalPage />);
    expect(document.body).toHaveStyle('overflow: unset');
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(document.body).toHaveStyle('overflow: hidden');
  });

  test('modal fades in', async () => {
    render(<ModalPage />);
    const categoryButton = screen.getByRole('button', {name: 'Salt Water Taffy'});
    await userEvent.click(categoryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('animate-fade-in');
  });
});