import React, { useState, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { Input, Button } from 'vtex.styleguide'

import style from './styles.css'

interface Props {
  title: string
  subtitle: string
  successMessage: string
}

const AviseMe: StorefrontFC<Props> = ({ title, subtitle, successMessage }) => {
  const {
    selectedItem: { itemId },
  } = useProduct()

  const [emailError, setEmailError] = useState<boolean | string>(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sentError, setSentError] = useState(false)
  const [didBlurEmail, setDidBlurEmail] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSent(false)
    setSentError(false)
  }, [email, name])

  const validateEmail = (newEmail: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    setEmailError(!emailRegex.test(newEmail.toLowerCase()))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  let emailErrorMessage = ''

  if (didBlurEmail && emailError) {
    emailErrorMessage = 'E-mail inválido'
  }

  const isFormDisabled = name === '' || email === '' || emailError || loading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append('notifymeClientName', name)
    formdata.append('notifymeClientEmail', email)
    formdata.append('notifymeIdSku', itemId)

    setLoading(true)

    fetch('/no-cache/AviseMe.aspx', {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    })
      .then(() => {
        setTimeout(() => {
          setLoading(false)
          setSent(true)
        }, 1000)
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false)
          setSentError(true)
        }, 1000)
      })
  }

  return (
    <form
      className={` ${style.container} pa6 b--solid bw1`}
      onSubmit={handleSubmit}
    >
      <h1 className="ttu fw7 f7 mb4 tracked-mega lh-copy">{title}</h1>
      <h2 className="fw4 f7 mb5">{subtitle}</h2>
      <div className="w-100 mr5 mb4">
        <Input
          name="name"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="w-100 mr5 mb4">
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setDidBlurEmail(true)}
          error={didBlurEmail && emailError}
          errorMessage={emailErrorMessage}
        />
      </div>
      <div className={`flex items-center mt6 mb4`}>
        <Button
          type="submit"
          variation="primary"
          size="small"
          disabled={isFormDisabled}
          isLoading={loading}
        >
          Enviar
        </Button>
      </div>
      {sent && <div className="mt6 t-body c-success"> {successMessage} </div>}
      {sentError && (
        <div className="mt6 t-body c-danger">
          Houve um erro ao enviar. Por favor, tente novamente mais tarde.
        </div>
      )}
    </form>
  )
}

AviseMe.defaultProps = {
  title: 'Este produto não está disponível no momento',
  subtitle: 'Quer saber quando ele volta?',
  successMessage: 'E-mail cadastrado com sucesso!',
}

AviseMe.schema = {
  type: 'object',
  title: 'Avise-Me',
  properties: {
    title: {
      type: 'string',
      title: 'Título',
      default: AviseMe.defaultProps.title,
    },
    subtitle: {
      type: 'string',
      title: 'Subtítulo',
      default: AviseMe.defaultProps.subtitle,
    },
    successMessage: {
      type: 'string',
      description: 'Mensagem exibida após o envio',
      title: 'Mensagem de sucesso',
      default: AviseMe.defaultProps.successMessage,
    },
  },
}

export default AviseMe
