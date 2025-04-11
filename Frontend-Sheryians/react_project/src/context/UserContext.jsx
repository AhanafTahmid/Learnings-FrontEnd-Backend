import React,{createContext} from 'react'
export const DataContext = createContext(); 

function UserContext(childd) {
    const global_username = "Tamim Iqbal Khan"
    console.log(childd);
  return (
    <>
        <div>{childd.children}</div>
        <DataContext.Provider value={global_username}>
           {childd.children}
        </DataContext.Provider>

    </>
    


  )
}

export default UserContext