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
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
  })

  it('should render calculate and reset buttons', () => {
    expect(
      screen.getByRole('button', { name: /calculate/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('should calculate sum when form is submitted', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('Number 1')
    const secondInput = screen.getByLabelText('Number 2')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 8/i)).toBeInTheDocument()
  })

  it('should calculate sum with decimal numbers', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('Number 1')
    const secondInput = screen.getByLabelText('Number 2')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(firstInput, '2.5')
    await user.type(secondInput, '7.3')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 9.8/i)).toBeInTheDocument()
  })

  it('should reset form when reset button is clicked', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('Number 1') as HTMLInputElement
    const secondInput = screen.getByLabelText('Number 2') as HTMLInputElement
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
        calculateButtonLabel='Beräkna'
        resetButtonLabel='Rensa'
        resultLabel='Resultat:'
      />,
    )
  })

  it('should render with custom labels', () => {
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /beräkna/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rensa/i })).toBeInTheDocument()
  })

  it('should display result with custom label', async () => {
    const user = userEvent.setup()

    const firstInput = screen.getByLabelText('Number 1')
    const secondInput = screen.getByLabelText('Number 2')
    const calculateButton = screen.getByRole('button', { name: /beräkna/i })

    await user.type(firstInput, '10')
    await user.type(secondInput, '5')
    await user.click(calculateButton)

    expect(screen.getByText(/resultat: 15/i)).toBeInTheDocument()
  })
})

describe('given a calculator with multiple numbers', () => {
  it('should render add and remove number buttons', () => {
    render(<Calculator />)

    expect(
      screen.getByRole('button', { name: /add number/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /remove number/i }),
    ).toBeInTheDocument()
  })

  it('should start with remove button disabled when only 2 numbers', () => {
    render(<Calculator />)

    const removeButton = screen.getByRole('button', { name: /remove number/i })
    expect(removeButton).toBeDisabled()
  })

  it('should add a new number input when add button is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    const addButton = screen.getByRole('button', { name: /add number/i })

    // Initially should have 2 inputs
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
    expect(screen.queryByLabelText('Number 3')).not.toBeInTheDocument()

    // Add a third input
    await user.click(addButton)

    expect(screen.getByLabelText('Number 3')).toBeInTheDocument()
  })

  it('should remove number input when remove button is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator numberOfInputs={3} />)

    const removeButton = screen.getByRole('button', { name: /remove number/i })

    // Initially should have 3 inputs
    expect(screen.getByLabelText('Number 3')).toBeInTheDocument()

    // Remove the third input
    await user.click(removeButton)

    expect(screen.queryByLabelText('Number 3')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
  })

  it('should disable add button when maximum numbers reached', () => {
    render(<Calculator numberOfInputs={10} />)

    const addButton = screen.getByRole('button', { name: /add number/i })
    expect(addButton).toBeDisabled()
  })

  it('should calculate sum of multiple numbers', async () => {
    const user = userEvent.setup()
    render(<Calculator numberOfInputs={4} />)

    const input1 = screen.getByLabelText('Number 1')
    const input2 = screen.getByLabelText('Number 2')
    const input3 = screen.getByLabelText('Number 3')
    const input4 = screen.getByLabelText('Number 4')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(input1, '10')
    await user.type(input2, '20')
    await user.type(input3, '5')
    await user.type(input4, '15')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 50/i)).toBeInTheDocument()
  })

  it('should calculate sum even with empty inputs', async () => {
    const user = userEvent.setup()
    render(<Calculator numberOfInputs={3} />)

    const input1 = screen.getByLabelText('Number 1')
    const input3 = screen.getByLabelText('Number 3')
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    await user.type(input1, '10')
    await user.type(input3, '5')
    await user.click(calculateButton)

    expect(screen.getByText(/result: 15/i)).toBeInTheDocument()
  })

  it('should respect numberOfInputs prop boundaries', () => {
    // Should enforce minimum of 2
    const { unmount: unmount1 } = render(<Calculator numberOfInputs={1} />)
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
    unmount1()

    // Should enforce maximum of 10
    render(<Calculator numberOfInputs={15} />)
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 10')).toBeInTheDocument()
    expect(screen.queryByLabelText('Number 11')).not.toBeInTheDocument()
  })

  it('should reset number of input fields to default when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator numberOfInputs={3} />)

    const addButton = screen.getByRole('button', { name: /add number/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })

    // Initially should have 3 inputs (the numberOfInputs prop)
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 3')).toBeInTheDocument()
    expect(screen.queryByLabelText('Number 4')).not.toBeInTheDocument()

    // Add two more inputs to make 5 total
    await user.click(addButton)
    await user.click(addButton)

    // Now should have 5 inputs
    expect(screen.getByLabelText('Number 4')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 5')).toBeInTheDocument()

    // Fill in some values
    const input1 = screen.getByLabelText('Number 1') as HTMLInputElement
    const input4 = screen.getByLabelText('Number 4') as HTMLInputElement
    await user.type(input1, '10')
    await user.type(input4, '20')

    // Reset the form
    await user.click(resetButton)

    // Should revert back to the original 3 inputs (numberOfInputs prop)
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Number 3')).toBeInTheDocument()
    expect(screen.queryByLabelText('Number 4')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Number 5')).not.toBeInTheDocument()

    // All remaining input values should be cleared
    expect((screen.getByLabelText('Number 1') as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText('Number 2') as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText('Number 3') as HTMLInputElement).value).toBe('')
  })
})
