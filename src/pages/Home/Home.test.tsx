import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/pages/Home'

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />)
  })

  it('renders header text', () => {
    render(<Home />)
    const headerElement = screen.getByText(/Data unit converter/i)
    expect(headerElement).toBeInTheDocument()
  })

  it('renders footer with correct text and links', () => {
    render(<Home />)
    const footerText = screen.getByText(/Made with 💪 by/i)
    expect(footerText).toBeInTheDocument()

    const personalLink = screen.getByRole('link', { name: /Jhordyess/i })
    expect(personalLink).toHaveAttribute('href', 'https://www.jhordyess.com')

    const githubLink = screen.getByRole('link', { name: /👉 View on GitHub/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jhordyess/data-unit-converter')
  })
})
