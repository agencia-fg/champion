const removeImpossibleItems = (product: Product, possibleSkus: string[]) => {
  product.items = product.items.filter((i: ProductItem) =>
    possibleSkus.includes(i.itemId)
  )

  return product
}

export default removeImpossibleItems
