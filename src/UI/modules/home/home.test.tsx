import { h } from 'preact'
import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { HomePageModule } from '.'

afterEach(() => {
  cleanup()
})
setTimeout(() => {
  return 30000
})
describe('Render home page', () => {
  test('click Open button - should display Connector by ID "shadowRoot"', async () => {
      render(<HomePageModule />)
      fireEvent.click(screen.getByTestId('button_open_connector'))
      await screen.findByTestId('shadowRoot')
      expect(screen.queryByTestId('shadowRoot')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('button_open_connector'))
      expect(screen.queryByTestId('shadowRoot')).not.toBeInTheDocument()

      //fireEvent.click(screen.getByTestId('button_open_connector'))
      //await screen.findByTestId('shadowRoot')
      //expect(screen.queryByTestId('shadowRoot')).toBeInTheDocument()
  })
  test('click Open button - button text: Close connector', async () => {
    render(<HomePageModule />)
    fireEvent.click(screen.getByTestId('button_open_connector'))
    await screen.findByText('Close connector')
    expect(screen.getByText('Close connector')).toBeInTheDocument()
  })
})
