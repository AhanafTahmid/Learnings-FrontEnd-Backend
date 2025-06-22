interface Product {
    id: number,
    name: string
    price: number
    image: string
    inStock: boolean
    category: string
}
const ProductCard = ({id, name, price, image, inStock, category}: Product) => {
  return (
    <>
        <h2>{name}</h2>
        <h2>Product: id {id}</h2>
        <p>{price}</p>
        <img src={image}/>
        <p>{category}</p>
        <button disabled={inStock?true:false} > Buy this </button>
    </>
  )
}

export default ProductCard