import { h } from 'preact'
import { FC } from 'preact/compat'
import { useState } from 'preact/hooks'

export const Counter: FC<{ initialCount: number }> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  const increment = () => setCount(count + 1)

  return (
    <div>
      Current value: {count}
      <button data-testid="increment_btn" onClick={increment}>Increment</button>
    </div>
  )
}
