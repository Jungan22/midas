import React from 'react'
import styles from './FormExamples.module.css'
import { Form } from 'react-aria-components'
import { TextField, Button, ButtonGroup, Text } from '@midas-ds/components'

export const Calculator = () => {
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
      className={styles.form}
    >
      <TextField
        label='Första talet'
        type='number'
        value={number1}
        onChange={setNumber1}
        placeholder='Ange första talet'
        isRequired
      />
      <TextField
        label='Andra talet'
        type='number'
        value={number2}
        onChange={setNumber2}
        placeholder='Ange andra talet'
        isRequired
      />
      <ButtonGroup>
        <Button type='submit'>Beräkna</Button>
        <Button
          type='button'
          variant='secondary'
          onPress={handleReset}
        >
          Rensa
        </Button>
      </ButtonGroup>
      {result !== null && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--midas-color-gray-10)',
            borderRadius: '4px',
          }}
        >
          <Text>
            <strong>Resultat: {result}</strong>
          </Text>
        </div>
      )}
    </Form>
  )
}
