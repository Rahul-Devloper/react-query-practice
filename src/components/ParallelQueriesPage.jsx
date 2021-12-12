import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperHeroes =()=>{
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends =()=>{
    return axios.get('http://localhost:4000/friends')
}


function ParallelQueriesPage() {

    const {data: superHeroData} = useQuery('super-heroes', fetchSuperHeroes)
    const {data: friendsData} = useQuery('friends', fetchFriends)
    return (
        <div>
            {superHeroData?.data.map((superHero)=>{
               return <h6 key={superHero.id}>{superHero.name}</h6>
            })}
            {friendsData?.data.map((friends)=>{
               return <h6 key={friends.id}>{friends.name}</h6>
            })}
        </div>
    )
}

export default ParallelQueriesPage
