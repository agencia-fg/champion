import React, { useState } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import useProduct from 'vtex.product-context/useProduct'
import { Modal } from 'vtex.styleguide'
import { Image } from 'vtex.store-image'

const TabelaDeMedidas: StorefrontFC = () => {
  const { product } = useProduct()

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!canUseDOM) {
    return <div></div>
  }

  if (!product) {
    return <div></div>
  }

  const tabelaDeMedidas = product.properties?.find(
    (property: any) => property.name === 'Tabela de Medidas'
  )?.values[0]

  if (!tabelaDeMedidas) {
    return null
  }

  return (
    <div>
      <Modal
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <Image src={tabelaDeMedidas} />
        </div>
      </Modal>

      <div
        className="flex items-center pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
        >
          <path
            d="M12.75 8.38a1.75 1.75 0 0 1 1.75 1.74v2.63a1.75 1.75 0 0 1-1.75 1.75H2.25a1.75 1.75 0 0 1-1.74-1.57 1.73 1.73 0 0 1-.01-.18V2.25A1.75 1.75 0 0 1 2.25.5h2.63a1.75 1.75 0 0 1 1.75 1.75v6.13Zm-7-2.63V4H4a.44.44 0 0 1-.44-.44.44.44 0 0 1 .44-.44h1.75v-.87a.88.88 0 0 0-.88-.88H2.25a.88.88 0 0 0-.88.88v10.59a.88.88 0 0 0 .87.79h10.51a.87.87 0 0 0 .88-.88v-2.63a.87.87 0 0 0-.88-.87h-.88V11a.44.44 0 0 1-.43.44A.44.44 0 0 1 11 11V9.25H9.25V11a.44.44 0 0 1-.44.44.44.44 0 0 1-.44-.44V9.25H6.63V11a.44.44 0 0 1-.44.44.44.44 0 0 1-.44-.44V9.25H4a.44.44 0 0 1-.44-.44.44.44 0 0 1 .44-.44h1.75V6.63H4a.44.44 0 0 1-.44-.44.44.44 0 0 1 .44-.44h1.75Z"
            fill="#0d0d0d"
            stroke="rgba(0,0,0,0)"
          />
        </svg>
        <div className="ml2">Tabela de Medidas</div>
      </div>
    </div>
  )
}

export default TabelaDeMedidas
