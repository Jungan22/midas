import '@testing-library/jest-dom'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calculator } from './Calculator'
import { axe } from 'jest-axe'

describe('given a default calculator', () => {
  let rendered: RenderResult

  beforeEach(() => {
    rendered = render(<Calculator />)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations()
  })

  it('should render input fields with default labels', () => {
    expect(screen.getByLabelText('First number')).toBeInTheDocument()
    expect(screen.getByLabelText('Second number')).toBeInTheDocument()
  })

  it('should render calculate and reset buttons', () => {
    expect(
      screen.getByRole('button', { name: /calculate/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('should calculate sum when form is submitted', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('First number')
    const secondInput = screen.getByLabelText('Second number')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 8/i)).toBeInTheDocument()
  })

  it('should calculate sum with decimal numbers', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('First number')
    const secondInput = screen.getByLabelText('Second number')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(firstInput, '2.5')
    await user.type(secondInput, '7.3')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 9.8/i)).toBeInTheDocument()
  })

  it('should reset form when reset button is clicked', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('First number') as HTMLInputElement
    const secondInput = screen.getByLabelText(
      'Second number',
    ) as HTMLInputElement
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })

    // Fill in values and calculate
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 8/i)).toBeInTheDocument()

    // Reset the form
    await user.click(resetButton)

    expect(firstInput.value).toBe('')
    expect(secondInput.value).toBe('')
    expect(screen.queryByText(/result:/i)).not.toBeInTheDocument()
  })
})

describe('given a calculator with custom labels', () => {
  beforeEach(() => {
    render(
      <Calculator
        firstNumberLabel='Första talet'
        secondNumberLabel='Andra talet'
        calculateButtonLabel='Beräkna'
        resetButtonLabel='Rensa'
        resultLabel='Resultat:'
      />,
    )
  })

  it('should render with custom labels', () => {
    expect(screen.getByLabelText('Första talet')).toBeInTheDocument()
    expect(screen.getByLabelText('Andra talet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /beräkna/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rensa/i })).toBeInTheDocument()
  })

  it('should display result with custom label', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('Första talet')
    const secondInput = screen.getByLabelText('Andra talet')
    const calculateButton = screen.getByRole('button', { name: /beräkna/i })

    await user.type(firstInput, '10')
    await user.type(secondInput, '5')
    await user.click(calculateButton)

    expect(screen.getByText(/resultat: 15/i)).toBeInTheDocument()
  })
})
