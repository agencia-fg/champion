import React, { useEffect, useState } from 'react';
import { OrderForm } from 'vtex.order-manager';
//@ts-ignore
import styles from './FreeShipping.css';

type PropsFreeShipping = { 
    titleFrete: string;
    valueFrete: string;
};

function FreeShipping({ titleFrete, valueFrete }: PropsFreeShipping){   
    const { useOrderForm } = OrderForm;
    const OrderFormContext = useOrderForm();  
    const totalValue = OrderFormContext.orderForm.value;
    const [dynamicValueFrete, setDynamicValueFrete] = useState(Number(valueFrete));

    /* useEffect para capturar o valor do elemento */
    useEffect(() => {
        const element = document.querySelector('.vtex-rich-text-0-x-paragraph--valor-do-frete');
        if (element) {
            setDynamicValueFrete(Number(element.textContent));         
        }
    }, []);

    const valorFrete = dynamicValueFrete;   
    const calculateBar = ((totalValue / valorFrete) * 100).toFixed(2);
    const dynamicWidth = `${calculateBar}%`; 

    const realValor = ((valorFrete - totalValue) / 100).toFixed(2);
    const RealNovo = realValor.split(".");

    console.log("valor frete: ",valorFrete);
    console.log("calculateBar: ",calculateBar);
    console.log("dynamicWidth: ",dynamicWidth);
    console.log("realValor: ",realValor);
    console.log("RealNovo: ",RealNovo);

    const fretetexto = totalValue < valorFrete
        ? `Faltam R$ ${RealNovo} para ganhar frete grátis`
        : "Parabéns, você ganhou frete grátis!";

    return (      
        <div className={styles.freeShippingItem}> 
            <div className={styles.title}>{titleFrete}</div>
            <div className={styles.freeShippingBar}>
                <div className={styles.freeShippingRange} style={{width: dynamicWidth}}>    
                </div>  
            </div>
            <p>{fretetexto}</p>
        </div>
    );  
}  

FreeShipping.schema = {
    title: 'Barra frete grátis',
    type: 'object',
    properties: {  
        titleFrete: {
            title: 'Título',
            description: 'Título do frete',
            type: 'string',
            default: 'Frete Grátis', 
        },
        valueFrete: {
            title: 'Valor',
            description: 'Valor do frete em centavos',
            type: 'string',
            default: '0',
            pattern: '^[0-9]+$', 
        },
    },
    required: ['valueFrete'], 
};

export default FreeShipping;