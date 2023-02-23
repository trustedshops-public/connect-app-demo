import { h } from 'preact'
import { FC } from 'preact/compat'
import logo from '@/assets/Brand_Logo_Trusted_Shops.svg'

const Logo: FC = () => {
  return (
    <span>
      <img src={logo} alt="logo" />
    </span>
  )
}

export default Logo
