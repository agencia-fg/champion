
import React from "react";
import { SliderLayout } from 'vtex.slider-layout'
// @ts-ignore
import styles from './styles.css'
import { useProduct } from "vtex.product-context";

const Mosaico = () => {
  const productContext: any = useProduct();
  const imageProduct = productContext?.selectedItem?.images;

  interface Item {
    imageUrl: string;
    imageLabel: string;
  }

  return (

    <div className={styles.bloco_slider_mobile}>
      <SliderLayout>

        {imageProduct.map((item: Item) => (
          <img className={styles.imagem_slider} src={item.imageUrl} alt={item.imageLabel} />
        ))}
        
      </SliderLayout>


    </div>

  );
};

export default Mosaico;