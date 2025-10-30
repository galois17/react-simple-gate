import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccessCodeLoginForm } from './AccessCodeLoginForm';
import { useAccessCode } from './AccessCodeContext'; // Import the hook

// Mock the 'useAccessCode' hook
vi.mock('./AccessCodeContext', () => ({
  useAccessCode: vi.fn(),
}));

// Mock a background component
const MockBackground = () => <div data-testid="mock-background"></div>;

describe('AccessCodeLoginForm', () => {
  // Create a mock login function to pass to the hook
  const mockLogin = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup the default mock implementation for the hook
    (useAccessCode as vi.Mock).mockReturnValue({
      login: mockLogin,
      isAuthorized: false,
      isLoading: false,
    });
  });

  it('renders with default text and background', () => {
    render(<AccessCodeLoginForm background={<MockBackground />} />);

    // Renders the background
    expect(screen.getByTestId('mock-background')).toBeInTheDocument();

    // Renders default text
    expect(screen.getByText('Access Required')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the access code to view this page.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unlock' })).toBeInTheDocument();
  });

  it('calls login function on form submit', () => {
    render(<AccessCodeLoginForm background={<MockBackground />} />);

    const input = screen.getByPlaceholderText('Enter code...');
    const button = screen.getByRole('button', { name: 'Unlock' });

    // Simulate user typing and submitting
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(button);

    // Check that the login function from the hook was called
    expect(mockLogin).toHaveBeenCalledWith('12345');
  });

  it('shows default error message on failed login', () => {
    // Make the mock login function return false
    mockLogin.mockReturnValue(false);

    render(<AccessCodeLoginForm background={<MockBackground />} />);

    const button = screen.getByRole('button', { name: 'Unlock' });
    fireEvent.click(button);

    // Check for the default error message
    expect(
      screen.getByText('Invalid access code. Please try again.')
    ).toBeInTheDocument();
  });

  it('renders with custom text props', () => {
    render(
      <AccessCodeLoginForm
        background={<MockBackground />}
        title="Custom Title"
        subtitle="Custom Subtitle"
        buttonText="Go"
      />
    );

    // Renders custom text
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();

    // Default text is not present
    expect(screen.queryByText('Access Required')).not.toBeInTheDocument();
    expect(screen.queryByText('Unlock')).not.toBeInTheDocument();
  });

  it('shows custom error message on failed login', () => {
    mockLogin.mockReturnValue(false);

    render(
      <AccessCodeLoginForm
        background={<MockBackground />}
        errorText="WRONG CODE!"
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check for the custom error message
    expect(screen.getByText('WRONG CODE!')).toBeInTheDocument();
    expect(
      screen.queryByText('Invalid access code. Please try again.')
    ).not.toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <AccessCodeLoginForm
        background={<MockBackground />}
        title="Custom Title"
        buttonText="Go"
        wrapperClassName="my-wrapper"
        titleClassName="my-title"
        subtitleClassName="my-subtitle"
        buttonClassName="my-button"
      />
    );

    const button = screen.getByRole('button', { name: 'Go' });
    const title = screen.getByText('Custom Title');
    const subtitle = screen.getByText(
      'Please enter the access code to view this page.' // Default subtitle
    );

    // The wrapper is tricky to get, check its child
    expect(title.closest('div')).toHaveClass('my-wrapper');

    // Check if the custom classes are applied
    expect(title).toHaveClass('my-title');
    expect(subtitle).toHaveClass('my-subtitle');
    expect(button).toHaveClass('my-button');

    // Check that default classes are still there
    expect(button).toHaveClass('w-full');
    expect(title).toHaveClass('font-bold');
  });
});

