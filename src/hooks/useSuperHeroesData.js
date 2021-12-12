import { useQuery, useMutation, useQueryClient } from 'react-query' //useMutation is used for creating, updating and delete data
// import axios from 'axios'
import { request } from '../utils/axios-utils'


const fetchSuperHeroes = ()=>{
    // return axios.get('http://localhost:4000/superheroes ')
    //using axios interceptor we do the below code
    return request({url: '/superheroes'})
}
//if there are multiple parameters more the than 2, pass as an argument within an object like {onSuccess, onError})
export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperHeroes, 
      {
          onSuccess: onSuccess,
          onError: onError,
          //select is mainly used to transform a data or select a particular data
          //and rendering it. Better thatn navigating to the particular data. (data.data.map si a bit hectic)
          //data.map is better just like in below code heroName under the click button
          //select automatically takes in the fetched data as a parameter
          // select: (data)=>{
          //     const superHeroNames = data.data.map((hero)=> hero.name)
          //     console.log("superHeroNames=>", superHeroNames)

          //     return superHeroNames //this function returns an array of superheronames.
          //   }
        //   enabled: false , //This will inform the react query to not fetch the data when the component mounts
      })

}


const addSuperHero =(hero)=>{
  // return axios.post('http://localhost:4000/superheroe', hero)
  //using axios interceptor, we do the below code
  return request({url: '/superheroes', method: 'post', data: hero})
}

export const useAddSuperHeroData = ()=>{
  const queryClient = useQueryClient()
  //addSuperHero gets any argument that is passed inside the mutate function as passed
  //in line 36 in RQSuperHeroesPage.jsx
  return useMutation(addSuperHero, 
    {
      // onSuccess: (data)=>{
      //   //In the below code, the current superheroes list corresponding tho key 'super-heroes'
      //   //is made to become invalid data. So, the react query will refetch the data along with all the 
      //   //new details of superHeroes that has been added to the form.
      //   //This will be called only when the mutate function successfully posts the details to the backend

      //   // queryClient.invalidateQueries('super-heroes') 
      //         //alternative method to update the existing data by updating the cache.
      //         //This will prevent an additional get request to fetch the data posted to the api 

      //         //setQueryData will update the existing cache specific query.
      //         // In this case 'super-heroes' cache will be updated with new data
      //         //the second argument is the function that will receive the existing cached data 
      //         //as an argument by defualt. We are mentioning it as 'oldQueryData' for simplicity
      //         queryClient.setQueryData('super-heroes', (oldQueryData)=>{
      //           return {
      //             ...oldQueryData, //this is like the existing cached response that was available befor mutating it
      //             //data.data refers to the response received on post request and the object that was passed in the post request which
      //             //is available in the .data
      //             data: [...oldQueryData.data, data.data],
      //           }
      //         })
      // },
      //onMutate will be default take the params that have been passed into the mutat function, here we give it a new name for simplicity
      onMutate:  async (newHero) =>{
         await queryClient.cancelQueries('super-heroes')
        const previousHeroData = queryClient.getQueryData('super-heroes')
        queryClient.setQueryData('super-heroes', (oldQueryData)=>{
                    return {
                      ...oldQueryData, 
                      data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero}],
                    }
                  })
                  return {
                    previousHeroData: previousHeroData //in case the update fails, the previous data will roll back
                  }
      },
      //onError takes three arguments, the error argument; the variables/params that were passed to the mutate function,
      //and the contextargument which contains additional information pertaining to the mutation
      onError: (_error, _hero, context)=>{
        queryClient.setQueryData('super-heroes', context.previousHeroData)//rolls back to previous data
      },
      //onSettled will be called whther the mutation is success or failure. Kind of like a default 
      onSettled: ()=>{
        queryClient.invalidateQueries('super-heroes') //this will ensure that the client state and server state are in sync
      }
  }
  )
}

