import { Fragment, h } from 'preact'
import { FC, useEffect, useState } from 'preact/compat'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/controls/buttun'
import { IFormValues, InputH } from '@/components/controls/input'
import Logo from '@/components/controls/logo'
import BackgroundCard from '@/components/layouts/backgroundCard'
import InfoBox from '@/components/layouts/infoBox'
import TextWithLink from '@/components/layouts/textWithLink'
import Spinner from '@/components/layouts/spinner'
import withLocalisation from '../../locales/withLocalisation'
import { PHRASES_AUTH_KEYS } from '@/locales/keys'
import { AUTH_KEYS } from '@/locales/types'
import useStore from '@/store/useStore'
import { selectorAuth, selectorInfoOfSystem } from '@/store/selector'

type IFormLogin = Pick<IFormValues, 'clientId' | 'clientSecret'>

const schema = yup
  .object({
    clientId: yup.string().required('Client Id is a required field'),
    clientSecret: yup.string().required('Client secret is a required field'),
  })
  .required()

const LoginPageModule: FC<{
  setPhrasesByKey: (keys: AUTH_KEYS) => void
  phrasesByKey: AUTH_KEYS
}> = ({ setPhrasesByKey, phrasesByKey }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  })

  const { signIn } = useStore()
  const { isAuthFailed, isAuthLoading } = useStore(selectorAuth)
  const { infoOfSystem } = useStore(selectorInfoOfSystem)

  const [nameOfSystem, setNameOfSystem] = useState('')

  useEffect(() => {
    setNameOfSystem(
      infoOfSystem.nameOfSystem ? infoOfSystem.nameOfSystem.replace(/[^a-zA-Z1-9._/-]/g, '') : ''
    )
  }, [infoOfSystem])

  useEffect(() => {
    setPhrasesByKey(PHRASES_AUTH_KEYS)
  }, [])

  const onSubmit: SubmitHandler<IFormLogin> = data => {
    signIn(data)
  }

  return (
    phrasesByKey && (
      <div className="ts-font-sans ts-flex ts-flex-col ts-items-center ts-justify-center">
        <BackgroundCard customClass="ts-p-8">
          {isAuthLoading ? (
            <div className="ts-flex ts-flex-col ts-items-center ts-justify-center ts-h-96">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="ts-relative ts-flex ts-items-center ts-justify-center ts-mb-8">
                <Logo />
                <div className="ts-absolute ts-right-0">
                  {phrasesByKey && (
                    <TextWithLink
                      id={'salesLink'}
                      text={phrasesByKey.authentication_salesLink_text}
                      url={phrasesByKey.authentication_salesLink_url_1.concat(
                        `?a_aid=${nameOfSystem}`
                      )}
                      textStyle="ts-text-default ts-font-normal ts-text-sm"
                    />
                  )}
                </div>
              </div>

              <BackgroundCard
                customClass="ts-relative ts-flex ts-flex-col ts-items-center ts-justify-center ts-p-8"
                isActive
              >
                <p className="ts-text-md ts-font-bold ts-text-default ts-pb-8">
                  {phrasesByKey.authentication_title}
                </p>
                <div className="ts-flex ts-mb-8">
                  <div className="ts-max-w-[320px]">
                    <p className="ts-text-sm ts-font-bold ts-text-default">
                      {phrasesByKey.authentication_credentials_help_title}
                    </p>
                    <div className="ts-mt-4 ts-w-[320px] ts-mb-6">
                      <p className="ts-text-sm ts-text-default ts-whitespace-pre-wrap">
                        {phrasesByKey.authentication_credentials_help_text}
                      </p>
                    </div>
                    <div className="ts-flex ts-justify-center">
                      <Button
                        id={'credentialsRequest'}
                        label={phrasesByKey.authentication_credentials_help_button_text}
                        onClick={() => {
                          window.open(
                            phrasesByKey.authentication_credentials_help_button_url.concat(
                              `?plugin=${nameOfSystem}`
                            )
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className="ts-w-0 ts-border-r-2 ts-border-solid ts-border-gray-700 ts-mx-16" />
                  <div className="ts-max-w-[320px]">
                    <p className="ts-text-sm ts-font-bold ts-text-default">
                      {phrasesByKey.authentication_credentials_connect_title}
                    </p>
                    <div className="ts-mt-4">
                      <form
                        className="ts-flex ts-flex-col ts-items-center ts-justify-center"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="ts-flex ts-flex-col ts-w-[320px] ts-gap-4 ts-pb-6">
                          <div>
                            <div className="ts-relative">
                              <InputH
                                id={'clientId'}
                                label={phrasesByKey.authentication_client}
                                registerName="clientId"
                                register={register}
                                isError={!!errors.clientId}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <InputH
                              id={'clientSecret'}
                              label={phrasesByKey.authentication_secret}
                              registerName="clientSecret"
                              register={register}
                              type="password"
                              isError={!!errors.clientSecret}
                              required
                            />
                          </div>
                        </div>
                        {isAuthFailed && (
                          <p className="ts-text-sm ts-text-error ts-mb-6">
                            {phrasesByKey.authentication_error}
                          </p>
                        )}
                        <Button
                          id={'credentialsSubmit'}
                          label={phrasesByKey.authentication_button_submit}
                          type="submit"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                {phrasesByKey && (
                  <TextWithLink
                    id={'supporthelp'}
                    text={phrasesByKey.authentication_supporthelp_text}
                    url={phrasesByKey.authentication_supporthelp_url_1}
                    textStyle="ts-text-secondary ts-font-normal ts-text-sm ts-text-center"
                  />
                )}
              </BackgroundCard>
              <div className="ts-flex ts-flex-col ts-items-center ts-justify-center ts-mt-8 ts-gap-5">
                {phrasesByKey && (
                  <TextWithLink
                    id={'copyright'}
                    text={phrasesByKey.global_copyright_text}
                    url={phrasesByKey.global_copyright_url_1}
                    textStyle="ts-text-secondary ts-font-normal ts-text-xxs ts-text-center"
                  />
                )}
              </div>
            </>
          )}
        </BackgroundCard>
        <InfoBox phrasesByKey={phrasesByKey} />
      </div>
    )
  )
}

export default {
  routeProps: {
    path: '/ts/authentication',
    component: withLocalisation(LoginPageModule),
  },
  name: 'LoginPageModule',
}
