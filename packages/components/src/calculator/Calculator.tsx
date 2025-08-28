'use client'

import * as React from 'react'
import { Form } from 'react-aria-components'
import { TextField } from '../textfield'
import { Button } from '../button'
import { ButtonGroup } from '../button'
import { Text } from '../text'
import styles from './Calculator.module.css'

export interface CalculatorProps {
  /**
   * Additional CSS class name to apply to the calculator container
   */
  className?: string
  /**
   * Number of input fields to display (2-10)
   * @default 2
   */
  numberOfInputs?: number
  /**
   * Label for the calculate button
   * @default "Calculate"
   */
  calculateButtonLabel?: string
  /**
   * Label for the reset button
   * @default "Reset"
   */
  resetButtonLabel?: string
  /**
   * Label for the result display
   * @default "Result:"
   */
  resultLabel?: string
  /**
   * Label for the add number button
   * @default "Add number"
   */
  addNumberLabel?: string
  /**
   * Label for the remove number button
   * @default "Remove number"
   */
  removeNumberLabel?: string
}

export const Calculator = ({
  className,
  numberOfInputs = 2,
  calculateButtonLabel = 'Calculate',
  resetButtonLabel = 'Reset',
  resultLabel = 'Result:',
  addNumberLabel = 'Add number',
  removeNumberLabel = 'Remove number',
}: CalculatorProps) => {
  // Ensure numberOfInputs is between 2 and 10
  const validNumberOfInputs = Math.min(Math.max(numberOfInputs, 2), 10)

  const [numbers, setNumbers] = React.useState<string[]>(() =>
    Array(validNumberOfInputs).fill(''),
  )
  const [result, setResult] = React.useState<number | null>(null)

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedNumbers = numbers.map(num => parseFloat(num))
    const validNumbers = parsedNumbers.filter(num => !isNaN(num))

    if (validNumbers.length > 0) {
      setResult(validNumbers.reduce((sum, num) => sum + num, 0))
    } else {
      setResult(null)
    }
  }

  const handleReset = () => {
    setNumbers(Array(numbers.length).fill(''))
    setResult(null)
  }

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers]
    newNumbers[index] = value
    setNumbers(newNumbers)
  }

  const handleAddNumber = () => {
    if (numbers.length < 10) {
      setNumbers([...numbers, ''])
    }
  }

  const handleRemoveNumber = () => {
    if (numbers.length > 2) {
      setNumbers(numbers.slice(0, -1))
    }
  }

  return (
    <Form
      onSubmit={handleCalculate}
      className={
        className ? `${styles.calculator} ${className}` : styles.calculator
      }
    >
      {numbers.map((number, index) => (
        <TextField
          key={index}
          label={`Number ${index + 1}`}
          type='number'
          value={number}
          onChange={value => handleNumberChange(index, value)}
        />
      ))}

      <div className={styles.controls}>
        <Button
          type='button'
          variant='secondary'
          onPress={handleAddNumber}
          isDisabled={numbers.length >= 10}
        >
          {addNumberLabel}
        </Button>
        <Button
          type='button'
          variant='secondary'
          onPress={handleRemoveNumber}
          isDisabled={numbers.length <= 2}
        >
          {removeNumberLabel}
        </Button>
      </div>

      <ButtonGroup>
        <Button type='submit'>{calculateButtonLabel}</Button>
        <Button
          type='button'
          variant='secondary'
          onPress={handleReset}
        >
          {resetButtonLabel}
        </Button>
      </ButtonGroup>
      {result !== null && (
        <div className={styles.result}>
          <Text>
            <strong>
              {resultLabel} {result}
            </strong>
          </Text>
        </div>
      )}
    </Form>
  )
}
