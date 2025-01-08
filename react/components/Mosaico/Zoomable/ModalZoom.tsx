import React from 'react'
import type { Modal } from 'vtex.modal-layout'
import { ModalTrigger } from 'vtex.modal-layout'

interface Props {
  children: React.ReactNode
  ModalZoomElement: typeof Modal
}

function ModalZoom(props: Props) {
  const { children, ModalZoomElement } = props

  return (
    <ModalTrigger>
      {children}
      <ModalZoomElement />
    </ModalTrigger>
  )
}

export default ModalZoom
