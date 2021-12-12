import { useQuery, useQueryClient  } from 'react-query'
import axios from 'axios'



const fetchSuperHeroeData = (heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
//if there are multiple parameters more the than 2, pass as an argument within an object like {onSuccess, onError})
const useSuperHeroData = (heroId)=>{
    const queryClient = useQueryClient()//useQueryClient gives access to all the cashed data

    //useQuery takes two params initially.
    // 1.unique string to identify the query. But in this case, the query is unique at each call as each
    // api call has a unique heroId. So, make sure to give a unique string to identify the
    // whole query hook with a unique string, along with hero id to make sure that the 
    // useQuery hook does not cache the request based only on the string key. The hero Id will 
    // also play a unique identifies for each herodetails request. 
    // For more clarity, check the query dev tools to understand the querying.

    
    // 2. the second param is the function to fetch the AudioParam. Since in this case the function depends 
    // on the herId to fetch data, that must be passed as a parameter to the function. And to accept the parameter
    // asynchornosusly, it must be changed to an arrow function to accept the heroId

return useQuery(['superHeroData', heroId], ()=>fetchSuperHeroeData(heroId),
{
    initialData : ()=>{
        const hero = queryClient
        .getQueryData('super-heroes')?.data?.find((hero)=> hero.id === parseInt(heroId))

        if(hero){
            return{
                data:hero //this data will get stored in the rqsuperheroespage in line no. 41 in the 2nd occurence of the 'data' keyword
            }
        } else{
            return undefined
        }
    }
})
}



export default useSuperHeroData
