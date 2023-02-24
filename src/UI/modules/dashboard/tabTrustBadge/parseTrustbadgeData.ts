import { ITrustbadgeChildren } from '@/baseLayers/types'

export enum PlacementDesktop {
  left = 'left',
  right = 'right',
}

export enum PlacementMobile {
  left = 'left',
  right = 'right',
  center = 'center',
}

export const getParsedTrustbadgeDataToString = (data: ITrustbadgeChildren): string => {
  let dataStr = ''
  Object.keys(data.attributes)
    .map(
      key =>
        `\n  ${data.attributes[key].attributeName}${
          data.attributes[key].value !== undefined ? `="${data.attributes[key].value}"` : ''
        }`
    )
    .forEach(atr => (dataStr += atr))

  return `<${data.tag || 'script'}${dataStr}>
</${data.tag || 'script'}>`
}

export const getParsedTrustbadgeDataStrToObj = (str: string): ITrustbadgeChildren => {
  const splitedStrings = str.split('\n')
  let tag = ''
  let attributes = {}
  for (let index = 0; index < splitedStrings.length - 1; index++) {
    const [attributeName, value] = splitedStrings[index].replace(/[\\" <>]/g, '').split('=')
    if (index === 0 && attributeName === 'script') {
      tag = attributeName
    } else if (!value) {
      attributes = {
        ...attributes,
        [attributeName]: {
          attributeName,
        },
      }
    } else {
      let parsedValue
      if (value === 'false') {
        parsedValue = false
      } else if (value === 'true') {
        parsedValue = true
      } else if (!isNaN(Number(value))) {
        if (
          attributeName === 'data-desktop-custom-width' ||
          attributeName === 'data-mobile-custom-width'
        ) {
          parsedValue = Number(value) < 0 ? 0 : Number(value)
        } else if (attributeName === 'data-desktop-y-offset') {
          parsedValue = validateValue(Number(value), -54, 999)
        } else if (attributeName === 'data-mobile-y-offset') {
          parsedValue = validateValue(Number(value), -10, 999)
        } else {
          parsedValue = Number(value)
        }
      } else if (attributeName === 'data-mobile-position') {
        parsedValue = !Object.keys(PlacementMobile).includes(value) ? '' : value
      } else if (attributeName === 'data-desktop-position') {
        parsedValue = !Object.keys(PlacementDesktop).includes(value) ? '' : value
      } else {
        parsedValue = value
      }

      attributes = {
        ...attributes,
        [attributeName]: {
          attributeName,
          value: parsedValue,
        },
      }
    }
  }
  return { tag, attributes }
}

function validateValue(value: number, min: number, max: number): number {
  if (min !== undefined && max !== undefined) {
    if (Number(value) < Number(min)) {
      value = min
    }
    if (Number(value) > Number(max)) {
      value = max
    }
  }
  return value
}
