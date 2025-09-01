import '@testing-library/jest-dom'
import { render, RenderResult, screen } from '@testing-library/react'
import { RoundButton } from './RoundButton'
import { axe } from 'jest-axe'
import { ButtonProps } from 'react-aria-components'
import { Plus, LucideIcon } from 'lucide-react'

describe('given a default round button', () => {
  let rendered: RenderResult

  beforeEach(() => {
    rendered = render(<RoundButtonTest>Click me!</RoundButtonTest>)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations()
  })

  it('should render with default props', () => {
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me!')
    expect(button).toHaveClass('roundButton')
    expect(button).toHaveClass('primary')
  })
})

describe('given a round button with icon', () => {
  beforeEach(() => {
    render(
      <RoundButtonTest icon={Plus} aria-label="Add item">
        Add
      </RoundButtonTest>
    )
  })

  it('should render icon correctly', () => {
    const button = screen.getByRole('button')
    expect(button).toContainHTML('<svg')
    expect(button).toHaveAttribute('aria-label', 'Add item')
  })
})

describe('given a round button with different variants', () => {
  it('should apply secondary variant class', () => {
    render(<RoundButtonTest variant="secondary">Secondary</RoundButtonTest>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('secondary')
  })

  it('should apply tertiary variant class', () => {
    render(<RoundButtonTest variant="tertiary">Tertiary</RoundButtonTest>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('tertiary')
  })

  it('should apply danger variant class', () => {
    render(<RoundButtonTest variant="danger">Danger</RoundButtonTest>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('danger')
  })
})

describe('given a round button with different sizes', () => {
  it('should apply medium size class', () => {
    render(<RoundButtonTest size="medium">Medium</RoundButtonTest>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('medium')
  })

  it('should not apply medium class for large size (default)', () => {
    render(<RoundButtonTest size="large">Large</RoundButtonTest>)
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('medium')
  })
})

describe('given a disabled round button', () => {
  let rendered: RenderResult

  beforeEach(() => {
    rendered = render(<RoundButtonTest isDisabled>Disabled</RoundButtonTest>)
  })

  it('should be disabled', () => {
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations()
  })
})

const RoundButtonTest = (props: ButtonProps & { 
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'large' | 'medium'
  icon?: LucideIcon
  iconSize?: number 
}) => <RoundButton {...props} />