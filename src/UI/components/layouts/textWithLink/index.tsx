import { h } from 'preact'
import { getStringWithUrlFromPhrases } from '@/helpers'
import { FC } from 'preact/compat'

interface Props {
  text: string
  url: string | Array<string>
  textStyle?: string
  linkStyle?: string
  id?: string
}

const TextWithLink: FC<Props> = ({ text, url, textStyle, linkStyle = '', id }) => {
  const textWithUrl = getStringWithUrlFromPhrases(text, url)
  return (
    <p id={`text_${id}`} className={`${textStyle} ts-whitespace-pre-wrap`}>
      {!!textWithUrl &&
        textWithUrl.map((item, index) => {
          return item.url ? (
            <a
              id={`link_${id}_${index}`}
              key={item}
              className={`${linkStyle} ts-text-blue-700 ts-cursor-pointer`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.text}
            </a>
          ) : (
            item.text
          )
        })}
    </p>
  )
}

export default TextWithLink

export const TextWithBold: FC<{ text: string; textStyle?: string }> = ({ text, textStyle }) => {
  const splitedText = text.split('[%b]')
  return (
    <p className={`${textStyle} ts-whitespace-pre-wrap ts-flex`}>
      {splitedText.map((item, index) => (
        <p key={item} className={index === 1 ? 'ts-font-semibold' : ''}>
          {item}
        </p>
      ))}
    </p>
  )
}
