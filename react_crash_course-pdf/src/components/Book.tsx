export interface Books {
    title: string
    author: string
    year: number
    isAvailable: boolean
}

interface BookType{
    bookiebro: Books;
}

const Book = ({bookiebro}: BookType) => {
  return (
    <>
    hello
    <h2>{bookiebro.title}</h2>
    <p>{bookiebro.author}</p>
    <p>{bookiebro.year}</p>
    <p style={{color: bookiebro.isAvailable?"green":"red"}}
    >{bookiebro.isAvailable?"Avaiable": "Not Available"}</p>
    {/* {console.log(bookiebro)} */}
    </>
  )
}

export default Book