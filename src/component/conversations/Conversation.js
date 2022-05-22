import { useState, useEffect } from 'react'
import './Conversation.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { fetchConversationData } from '../../features/conversationSlice';

function Conversation() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const conversation = useSelector(state => state.conversation.data);
  const guestId = useParams().guestId;
  const [Data, setData] = useState([])

  let navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser])

  const dispatch = useDispatch()
  useEffect((Data) => {
    dispatch(fetchConversationData(guestId)).unwrap().then(data => {
      return data
    }).catch(err => console.log(err))
  }, [])

  // Data.results.map(element => {
  //   console.log(element.user[0].name)
  // });
  console.log(conversation)
  // console.log(Data.results)
  

  return (
    <div className="conversation">
      <img className="conversationImg" src="" alt="" />
      <span className="conversationName"><h2>{conversation[0]?.user[0].name}</h2></span>
    </div>
  )
}

export default Conversation



    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const friendId = conversation.user.find((m) => m !== currentUser._id);
    //     const getUser = async () => {
    //         try {
    //             const res = await axios("/users?userId=" + friendId);
    //             setUser(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getUser([currentUser, conversation]);
    // }, []);