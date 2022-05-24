import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { fetchConversationData } from "../../features/conversationSlice";

import "./Conversation.css";

function SidebarHome() {
  //   const { user: currentUser } = useSelector((state) => state.auth);
  //   const conversation = useSelector((state) => state.conversation.data);

  //   let navigate = useNavigate();
  //   useEffect(() => {
  //     if (!currentUser) {
  //       navigate("/login");
  //     }
  //   }, [currentUser]);

  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchConversationData("6285b24ec49775b985975ccf"))
  //       .unwrap()
  //       .then((data) => {
  //         return console.log(data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  //   return (
  //     <div className="conversation">
  //       <img className="conversationImg" src="" alt="" />
  //       <span className="conversationName">{conversation[0]?.user[0].name}</span>
  //     </div>
  //   );
  // }
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
  // console.log(conversation)
  // console.log(Data.results)


  return (
    <div className="conversation">
      <img className="conversationImg" src="" alt="" />
      <span className="conversationName"><h2>{conversation[0]?.user[0].name}</h2></span>
    </div>
  )
}

export default SidebarHome;
