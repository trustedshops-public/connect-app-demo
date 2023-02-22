const spinner = {
  left: '46px',
  top: '4.5px',
  position: 'absolute',
  background: '#575454',
  width: '8px',
  height: '27px',
  borderRadius: '4px / 4.86px',
  transformOrigin: '4px 45.5px',
  boxSizing: 'content-box',
}

export const styles: {
  [key: string]: {
    [key: string]: string
  }
} = {
  wrapper: {
    width: '40px',
    height: '40px',
    display: 'inline-block',
    overflow: 'hidden',
    background: 'none',
  },
  spinnerWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: 'translateZ(0) scale(0.4)',
    backfaceVisibility: 'hidden',
    transformOrigin: '0 0',
  },
  firstСhild: {
    ...spinner,
    transform: 'rotate(0deg)',
    animationDelay: '-0.9166666666666666s',
  },
  secondСhild: {
    ...spinner,
    transform: 'rotate(30deg)',
    animationDelay: '-0.8333333333333334s',
  },
  thirdСhild: {
    ...spinner,
    transform: 'rotate(60deg)',
    animationDelay: '-0.75s',
  },
  fourthСhild: {
    ...spinner,
    transform: 'rotate(90deg)',
    animationDelay: '-0.6666666666666666s',
  },
  fifthСhild: { ...spinner, transform: 'rotate(120deg)', animationDelay: '-0.5833333333333334s' },
  sixthСhild: { ...spinner, transform: 'rotate(150deg)', animationDelay: '-0.5s' },
  seventhСhild: { ...spinner, transform: 'rotate(180deg)', animationDelay: '-0.4166666666666667s' },
  eighthСhild: { ...spinner, transform: 'rotate(210deg)', animationDelay: '-0.3333333333333333s' },
  ninthСhild: { ...spinner, transform: 'rotate(240deg)', animationDelay: '-0.25s' },
  tenthСhild: { ...spinner, transform: 'rotate(270deg)', animationDelay: '-0.16666666666666666s' },
  eleventhСhild: {
    ...spinner,
    transform: 'rotate(300deg)',
    animationDelay: '-0.08333333333333333s',
  },
  twelfthСhild: { ...spinner, transform: 'rotate(330deg)', animationDelay: '0s' },
}
