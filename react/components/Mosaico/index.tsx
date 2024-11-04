import React from "react";
// @ts-ignore
import styles from './styles.css';
import { useProduct } from "vtex.product-context";

// Definindo a interface para a imagem
interface Image {
  imageUrl: string;
  imageLabel: string;
}

const Mosaico = () => {
  const productContext: any = useProduct();
  const imageProduct: Image[] = productContext?.selectedItem?.images || []; // Tipando a lista de imagens

  return (
    <div>
      <div>
        <div className={styles.bloco1_Img}>
          <div>
            {imageProduct[0] && (
              <img 
                src={imageProduct[0].imageUrl} 
                className={styles.imagem1}  
                alt={imageProduct[0].imageLabel} 
                key={imageProduct[0].imageUrl} // Usando a URL da imagem como key
              />
            )}
          </div>
          <div>
            {imageProduct[1] && (
              <img 
                className={styles.imagem2}  
                src={imageProduct[1].imageUrl} 
                alt={imageProduct[1].imageLabel} 
                key={imageProduct[1].imageUrl} // Usando a URL da imagem como key
              />
            )}
          </div>

          {/* Loop para imagens a partir do índice 2 */}
          {imageProduct.slice(2).map((image: Image) => (
            <div key={image.imageUrl}> {/* Usando a URL da imagem como key */}
              <img 
                src={image.imageUrl} 
                alt={image.imageLabel} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mosaico;
