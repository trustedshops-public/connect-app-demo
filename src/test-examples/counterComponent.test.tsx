import { h } from 'preact'
import { Counter } from '@/test-examples/Counter'
import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'

afterEach(() => {
  cleanup()
})

describe('Counter', () => {
  test('should display initial count', () => {
    const { container } = render(<Counter initialCount={6} />)
    expect(container.textContent).toMatch('Current value: 6')
  })

  test('should increment after "Increment" button is clicked', async () => {
    render(<Counter initialCount={5} />)

    fireEvent.click(screen.getByTestId('increment_btn'))
    await waitFor(() => {
      expect(screen.getByText('Current value: 6')).toBeInTheDocument()
    })
  })
  test('should increment counter', async () => {
    render(<Counter initialCount={5} />)

    fireEvent.click(screen.getByTestId('increment_btn'))

    await screen.findByText('Current value: 6') // waits for changed element

    expect(screen.getByText('Current value: 6')).toBeInTheDocument() // passes
  })
})
