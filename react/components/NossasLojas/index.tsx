import React from 'react'

import style from './styles.css'

interface Props {
  items: ILoja[]
}
interface ILoja {
  titulo: string
  telefone: string
  whatsapp: string
  email: string
  endereco: string
  horario: string
  linkMaps: string
}

const formatWhatsapp = (str: string) => {
  if (!str) {
    return ''
  }

  return `+55${str
    .trim()
    .replace(/(\s|_)+/, '')
    .replace(/(^-+|-+$)/, '')
    .replace(/[^a-z0-9]+/g, '')}`
}

const NossasLojas: StorefrontFC<Props> = ({ items }) => {
  return (
    <div className={`${style.LojasList} lh-copy`}>
      {items.map((loja, index) => (
        <div className={style.LojasItem} key={index}>
          <h3 className={style.LojasTitle}>{loja.titulo} </h3>
          <h4>Contato</h4>
          <p>
            Tel: {loja.telefone} | Whatsapp:{' '}
            <a
              className="hover-c-emphasis underline-hover"
              target="_blank"
              href={`https://wa.me/${formatWhatsapp(loja.whatsapp)}`}
            >
              {loja.whatsapp}
            </a>
            <br />
            <a
              href={`mailto:${loja.email}`}
              target="_blank"
              className="hover-c-emphasis underline-hover"
            >
              {loja.email}
            </a>
          </p>
          <h4>Endereço</h4>
          <p>{loja.endereco}</p>
          <h4>Horário de atendimento</h4>
          <p> {loja.horario} </p>
          <a
              className={style.linkGoogleMaps}
              target="_blank"
              href={loja.linkMaps}
            >
              Ver no maps
            </a>
        </div>
      ))}
    </div>
  )
}

NossasLojas.defaultProps = {
  items: [],
}

NossasLojas.schema = {
  type: 'object',
  title: 'Lista de Nossas Lojas',
  properties: {
    items: {
      title: 'Lojas',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          titulo: {
            type: 'string',
            title: 'Título',
          },
          telefone: {
            type: 'string',
            title: 'Telefone',
          },
          whatsapp: {
            type: 'string',
            title: 'Whatsapp',
          },
          email: {
            type: 'string',
            title: 'Email',
          },
          endereco: {
            type: 'string',
            title: 'Endereço',
          },
          horario: {
            type: 'string',
            title: 'Horário de atendimento',
          },
          linkMaps: {
            type: 'string',
            title: 'Maps',
          }
        },
      },
    },
  },
}

export default NossasLojas
