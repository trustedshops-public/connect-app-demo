/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, render } from 'preact'
import { App } from './app'
import 'tailwindcss/tailwind.css'

render(<App />, document.getElementById('app')!)
