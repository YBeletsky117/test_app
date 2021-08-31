import './index.css'
import { useParams } from 'react-router-dom'

const MainPage = () => {


  let topicId = useParams();
  console.log(topicId);
  
    return (
        <div>
            <p>Users</p>
        </div>
    )
}
export {MainPage}