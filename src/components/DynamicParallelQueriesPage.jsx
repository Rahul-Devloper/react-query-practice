import { useQueries } from "react-query"
import axios from "axios"

const fetchSuperHero = (heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
const DynamicParallelQueriesPage = ({heroIds}) => {
    //consider an example where a table is present and the user wnats details of many ids alltogether
    //so he selects two id 2 and 3 and clicks next. he is redirected to a page where he gets all the results obtained 
    //from those specific ids. This is basically calling multiple queries instead of single queries
    //
    //Hence, useQueries is called. SInce multiple queries is called, they need to be mapped and then
    //given their separate id and string type
    const queryResults = useQueries(
         heroIds.map((id)=>{
             return {
                 queryKey: ['superHeroId', id],
                 queryFn: ()=> fetchSuperHero(id)
             }
         })
    )

    console.log({queryResults})
    return (
        <div>
           DynamicParallelQueriesPage 
        </div>
    )
}

export default DynamicParallelQueriesPage
