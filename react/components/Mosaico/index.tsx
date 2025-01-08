import React, { useState } from 'react'
// @ts-ignore
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'
import Zoomable from './Zoomable'

// Definindo a interface para a imagem
interface Image {
  imageUrl: string
  imageLabel: string
}

const Mosaico = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null) // Controla a imagem em zoom
  const productContext: any = useProduct()
  const imageProduct: Image[] = productContext?.selectedItem?.images || [] // Tipando a lista de imagens

  const handleImageClick = (imageUrl: string) => {
    setZoomedImage(imageUrl) // Define a imagem para zoom
  }

  const closeZoom = () => {
    setZoomedImage(null) // Fecha o zoom
  }

  return (
    <div>
      <div className={styles.bloco1_Img}>
        {imageProduct.map((image, index) => (
          <div key={index}>
            <Zoomable mode="in-place-hover">
              <img
                src={image.imageUrl}
                alt={image.imageLabel}
                className={styles[`imagem${index + 1}`]}
                onClick={() => handleImageClick(image.imageUrl)} // Ativa o zoom ao clicar
              />
            </Zoomable>
          </div>
        ))}
      </div>

      {zoomedImage && (
        <>
          <div className={styles.overlay} onClick={closeZoom}></div>
          <div className={styles.zoomimgblock}>
            <Zoomable mode="in-place-hover">
              <img
                src={zoomedImage}
                className={styles.zoomed}
                alt="Zoomed"
                onClick={closeZoom} // Fecha o zoom ao clicar na imagem
              />
            </Zoomable>
          </div>
        </>
      )}
    </div>
  )
}

export default Mosaico
