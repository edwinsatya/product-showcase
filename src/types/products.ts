interface IProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  stock: number
  images: string[]
}

interface IProductResponse {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}