import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { Gate } from './Gate';

describe('Gate Component', () => {
  it('renders children when isAllowed is true', () => {
    render(
      <Gate isAllowed={true}>
        <div>Protected Content</div>
      </Gate>
    );

    // Check if the content is in the document
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not render children when isAllowed is false', () => {
    render(
      <Gate isAllowed={false}>
        <div>Protected Content</div>
      </Gate>
    );

    // Check if the content is NOT in the document
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

