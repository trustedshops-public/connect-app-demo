import { FC } from 'preact/compat'
import { Fragment, h } from 'preact'
import { styles } from './spinnercss'

const Spinner: FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinnerWrapper}>
        <div style={styles.firstСhild} className="ts-animate-spinner" />
        <div style={styles.secondСhild} className="ts-animate-spinner" />
        <div style={styles.thirdСhild} className="ts-animate-spinner" />
        <div style={styles.fourthСhild} className="ts-animate-spinner" />
        <div style={styles.fifthСhild} className="ts-animate-spinner" />
        <div style={styles.sixthСhild} className="ts-animate-spinner" />
        <div style={styles.seventhСhild} className="ts-animate-spinner" />
        <div style={styles.eighthСhild} className="ts-animate-spinner" />
        <div style={styles.ninthСhild} className="ts-animate-spinner" />
        <div style={styles.tenthСhild} className="ts-animate-spinner" />
        <div style={styles.eleventhСhild} className="ts-animate-spinner" />
        <div style={styles.twelfthСhild} className="ts-animate-spinner" />
      </div>
    </div>
  )
}

export const ScrinSpinner: FC = () => {
  return (
    <>
      <div className="ts-justify-center ts-items-center ts-flex ts-overflow-x-hidden ts-overflow-y-auto ts-fixed ts-inset-0 ts-z-50 ts-outline-none focus:ts-outline-none">
        <Spinner />
      </div>
      <div className="ts-opacity-20 ts-fixed ts-inset-0 ts-z-40 ts-bg-black" />
    </>
  )
}
export default Spinner
