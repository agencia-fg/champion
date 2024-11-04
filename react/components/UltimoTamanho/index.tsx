import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from 'vtex.product-context';

interface UltimoTamanhoProps {
  productId: string;
}

const UltimoTamanho: React.FC<UltimoTamanhoProps> = ({ productId }) => {
  const productContext = useContext(ProductContext);
  const IDproduct = productContext?.product?.productId;
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skuId, setSkuId] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchData = (skuIdParam: string | null) => {
    if (!skuIdParam || !IDproduct) return; // Se não houver skuId ou ID do produto, não faz a busca

    fetch(`/api/catalog_system/pub/products/variations/${IDproduct}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Dados recebidos:', data);
        const foundSku = data.skus.find((sku: any) => sku.availablequantity === 1 && sku.sku == skuIdParam);
        console.log('sku stock', foundSku);
        if (foundSku) {
          setAvailableQuantity(foundSku.availablequantity);
        } else {
          setAvailableQuantity(0);
        }
      })
      .catch((error) => {
        console.error('Houve um problema com a operação fetch:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Função para extrair SKU ID da URL e buscar os dados
  const updateSkuIdFromURL = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const skuIdParam = queryParams.get('skuId');
    if (skuIdParam) {
      setSkuId(skuIdParam);
      console.log('SKU ID extraído da URL:', skuIdParam);
      fetchData(skuIdParam); // Busca dados com o novo SKU ID
    } else {
      console.log('Nenhum SKU ID encontrado na URL.');
      setAvailableQuantity(0); // Se não houver SKU ID, defina a quantidade como 0
    }
  };

  useEffect(() => {
    // Chama a função para extrair SKU ID da URL ao montar o componente
    updateSkuIdFromURL();

    // Função de callback para o evento popstate (navegação no histórico)
    const handlePopState = () => {
      updateSkuIdFromURL(); // Atualiza o SKU ID e busca os dados
    };

    // Adiciona um listener para o evento 'popstate'
    window.addEventListener('popstate', handlePopState);

    // Monitora mudanças na URL diretamente
    const observer = new MutationObserver(() => {
      const newSkuId = new URLSearchParams(window.location.search).get('skuId');
      if (newSkuId !== skuId) {
        setSkuId(newSkuId);
        fetchData(newSkuId);
      }
    });

    // Começa a observar mudanças na URL
    observer.observe(document.body, { childList: true, subtree: true });

    // Limpeza do listener quando o componente é desmontado
    return () => {
      window.removeEventListener('popstate', handlePopState);
      observer.disconnect();
    };
  }, [productId, skuId]); // O efeito depende do productId e skuId

  // Verifica o estado de loading ou erro
  if (loading) {
    return <p style={{ display: 'none' }}>Carregando...</p>;
  }
  if (error) {
    return <p style={{ display: 'none' }}>Erro: {error}</p>;
  }

  // Retorna a interface com a mensagem se a quantidade disponível for 1
  return (
    <div>
      {availableQuantity === 1 && (
        <>
          <span className='lastSize'>Último tamanho disponível!</span>
          <span style={{ display: 'none' }}>{skuId}</span>
        </>
      )}
    </div>
  );
};

export default UltimoTamanho;
