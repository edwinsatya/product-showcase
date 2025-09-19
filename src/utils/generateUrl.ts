interface Params {
  sortBy?: string
  order?: "asc" | "desc"
  category?: string 
  limit: number
  skip: number
}

export default function generateQuery({ category, order, sortBy, limit, skip }: Params) {
  let url: string
  if (category) {
    url = `/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  } else {
    url = `?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  }
  return url
}