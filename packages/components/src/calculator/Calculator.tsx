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
   * Label for the first number input field
   * @default "First number"
   */
  firstNumberLabel?: string
  /**
   * Label for the second number input field
   * @default "Second number"
   */
  secondNumberLabel?: string
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
   * Placeholder text for the first number input
   * @default "Enter first number"
   */
  firstNumberPlaceholder?: string
  /**
   * Placeholder text for the second number input
   * @default "Enter second number"
   */
  secondNumberPlaceholder?: string
}

export const Calculator = ({
  className,
  firstNumberLabel = 'First number',
  secondNumberLabel = 'Second number',
  calculateButtonLabel = 'Calculate',
  resetButtonLabel = 'Reset',
  resultLabel = 'Result:',
  firstNumberPlaceholder = 'Enter first number',
  secondNumberPlaceholder = 'Enter second number',
}: CalculatorProps) => {
  const [number1, setNumber1] = React.useState('')
  const [number2, setNumber2] = React.useState('')
  const [result, setResult] = React.useState<number | null>(null)

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const num1 = parseFloat(number1)
    const num2 = parseFloat(number2)

    if (!isNaN(num1) && !isNaN(num2)) {
      setResult(num1 + num2)
    } else {
      setResult(null)
    }
  }

  const handleReset = () => {
    setNumber1('')
    setNumber2('')
    setResult(null)
  }

  return (
    <Form
      onSubmit={handleCalculate}
      className={className ? `${styles.calculator} ${className}` : styles.calculator}
    >
      <TextField
        label={firstNumberLabel}
        type="number"
        value={number1}
        onChange={setNumber1}
        placeholder={firstNumberPlaceholder}
        isRequired
      />
      <TextField
        label={secondNumberLabel}
        type="number"
        value={number2}
        onChange={setNumber2}
        placeholder={secondNumberPlaceholder}
        isRequired
      />
      <ButtonGroup>
        <Button type="submit">{calculateButtonLabel}</Button>
        <Button
          type="button"
          variant="secondary"
          onPress={handleReset}
        >
          {resetButtonLabel}
        </Button>
      </ButtonGroup>
      {result !== null && (
        <div className={styles.result}>
          <Text>
            <strong>{resultLabel} {result}</strong>
          </Text>
        </div>
      )}
    </Form>
  )
}

export type { CalculatorProps }