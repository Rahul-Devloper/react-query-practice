import React from 'react'
import { Link } from 'react-router-dom'
import {useSuperHeroesData} from '../hooks/useSuperHeroesData'
import { useAddSuperHeroData } from '../hooks/useSuperHeroesData'
import { useState } from 'react'



const RQSuperHeroesPage = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

//Success and Error callbacks
//React Query automatically injects the fetched data and errors in the following callbacks.
//They can be called by passing a parameter. The function is similar to passing the
//res or response in .then(res) or .then(response) and console.loggging the response

const onSuccess = (data)=>{
    console.log('Perform side effect after data fetching', data)
}

const onError = (error)=>{
    console.log('Perform side effect after encountering error', error.message)
}


//useQuery accepts two args. a unique key  and a function that RETURNs a promise
//refetch is used for manually triggering data fetch. It can be used to click events
      const {isLoading, data, isError, error, refetch, isFetching} = useSuperHeroesData(onSuccess, onError)
      const {mutate: addHero} = useAddSuperHeroData()
      //mutate is the option that postes the details into the db using the api. 
      //Here we are changing the name of mutate to addHero for simplicity
        const handleAddHeroClick =()=>{
            console.log({name: name, alterEgo: alterEgo})
            const hero = {name: name, alterEgo: alterEgo}
            addHero(hero)
            setName('')
            setAlterEgo('')
        }
      if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    // console.log("data=>", data.data)
    // console.log("error=>", error)

    return (
        <>
        <h2>
            RQSuperHeroesPage
        </h2>
        <div>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
            <input type="text" value={alterEgo} onChange={(e)=> setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
        </div>
        <button onClick={refetch}>Fetch Heroes</button>
        {data?.data.map((hero)=>{
            return <div key={hero.id}><Link to={`/rq-superHeroDetails/${hero.id}`}>{hero.name}</Link></div>
        })}
        {/* {data.map(heroName=>{ //the word 'data' is the array of superheronames. The word 'data' takes a reference of the original superheronames
            console.log("data of superheronames", data)
            return <div key={heroName}>{heroName}</div>
        })} */}
        </>
    )
}

export default RQSuperHeroesPage