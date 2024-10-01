import React from 'react';
import { useProduct } from 'vtex.product-context';


function flagLastItemSKU(){
    const product = useProduct();
    const colorLength = product?.product?.skuSpecifications[1].values.length;
    console.log("product: ", product);
    console.log("colorLength: ", colorLength);
    if(colorLength == 1){
        return(
            <>{colorLength} cor disponíveis</>
            )   
    }else{
        return(
            <>{colorLength} cores disponíveis</>
            ) 
    }
    
}

export default flagLastItemSKU;