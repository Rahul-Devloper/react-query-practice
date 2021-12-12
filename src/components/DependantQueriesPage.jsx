import { useQuery } from "react-query"
import axios from "axios"

const fetchUserByEmail = (email)=>{
    axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId)=>{
    axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependantQueriesPage = ({email}) => {

    const {data: user} = useQuery(['user', email], ()=> fetchUserByEmail(email))
    const channelId = user?.data.channelId

    useQuery(['courses', channelId], ()=>fetchCoursesByChannelId(channelId), 
    {
        enabled:!!channelId //specifying that the channelId will be called only after the first user email is called. 
    })

    return (
        <div>
            DependantQueriesPage
        </div>
    )
}
 
export default DependantQueriesPage
