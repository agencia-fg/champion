import type { FunctionComponent } from 'react'

type GenericObject = Record<string, any>

declare global {
  interface StorefrontComponent<P = GenericObject, S = GenericObject>
    extends Component<P, S> {
    getSchema?(props: P): GenericObject
    schema: GenericObject
  }

  interface StorefrontFC<P = GenericObject> extends FunctionComponent<P> {
    getSchema?(props: P): GenericObject
    schema?: GenericObject
  }

  interface BenefitItem {
    benefitProduct: Product
    benefitSKUIds: [string]
    discount: Float
    minQuantity: Int
  }

  interface CartItem {
    id: string
    productId: string
    quantity: number
    uniqueId: string
    detailUrl: string
    name: string
    brand: string
    category: string
    productRefId: string
    seller: string
    variant: string
    skuName: string
    price: number
    listPrice: number
    sellingPrice: number
    sellingPriceWithAssemblies: number
    measurementUnit: string
    skuSpecifications: any[]
    imageUrl: string
    options: any[]
    assemblyOptions: {
      added: any[]
      removed: any[]
      parentPrice: number
    }
    referenceId: Array<{
      Key: string
      Value: string
    }> | null
  }

  interface ProductItem {
    itemId: string
    name: string
    images: Image[]
    variations: Array<{
      name: string
      values: string[]
    }>
    sellers: Array<{
      sellerDefault: boolean
      commertialOffer: {
        Price: number
        ListPrice: number
        AvailableQuantity: number
      }
    }>
  }

  interface Product {
    brand: string
    brandId: string
    itemMetadata: ItemMetadata
    items: ProductItem[]
    linkText: string
    productId: string
    skuSpecifications: SkuSpecification[]
    productName: string
    productReference: string
    brand: string
    description: string
  }
}
