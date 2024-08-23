import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';
jest.mock('axios');

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    baseImagePath: '/',
  },
}));

describe('HomePage', () => {
  test('should render without issue', async () => {
    render(<HomePage />);
    const getByText = screen.getByText(/Home Page/);
    expect(getByText).toBeInTheDocument();
  });
});
