import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getUserList, verifyUser, AddFriend, DeleteFriend, EditUserName, DeleteUser } from './api';


function App() {
  const GetName = sessionStorage.getItem('name');
  const Getuserid = sessionStorage.getItem('userid');
  const [username, setUsername] = useState(GetName ?? '');
  const [userid, setUserid] = useState(Getuserid ?? null);
  const [fetch, setFetch] = useState(false);
  const [toggle, setToggle] = useState('friendslist');
  const [nonFriends, setNonfriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userList, setUserList] = useState([])

  useEffect(() => {
    console.log(userid);
    if (userid) {
      GetUserDetails();
    }
  }, [userid, fetch])

  const GetUserDetails = () => {
    getUserList(userid).then((res) => {
      if (res.status) {
        setNonfriends(res.data?.non_friends);
        setRequests(res.data?.friends_not_added_by_user);
        setUserList(res.data?.friends_added_by_user)
      } else {
        setUserList([])
        setRequests([])
        setNonfriends([]);
      }
    })
  }

  const VerifyUser = (username) => {
    const reqbody = { username: username }
    verifyUser(reqbody).then((res) => {
      if (res.status) {
        setUserid(res.data?.userid)
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userid', res.data?.userid);
      } else {
        toast.error(res.message);
      }
    })
  }

  const AddFriendToList = (friendid) => {
    const reqbody = { userid, friendid }
    AddFriend(reqbody).then((res) => {
      if (res.status) {
        toast.success("Added as your friend!")
        GetUserDetails()
      } else {
        toast.error(res.message)
      }
    })
  }

  const RemoveFriendFromList = (friendid) => {
    DeleteFriend(userid, friendid).then((res) => {
      if (res.status) {
        toast.success("Removed!")
        GetUserDetails()
      } else {
        toast.error(res.message)
      }
    })
  }

  const handleLogout = () => {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');
    setUsername('');
    setUserid(null)
  }


  const LoginCard = () => {
    const [username1, setUsername1] = useState('');

    const handleJoin = () => {
      sessionStorage.setItem('name', username1);
      setUsername(username1);
      VerifyUser(username1)
    }

    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className="border p-5 h-[400px] w-[500px] rounded-xl shadow mt-5 flex flex-col justify-center">
          <h2 className='font-bold text-2xl text-center my-5'>Welcome to Amigos!</h2>
          <div>
            <div className='flex gap-2 my-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg> Username</div>
            <input className=" mb-2 w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-0" onChange={(e) => setUsername1(e.target.value)} value={username1}></input>
          </div>
          <button onClick={() => handleJoin()} className="px-8 py-1 bg-[#3A6EDE] text-white rounded-md active:bg-blue-600">
            Join
          </button>
        </div>
      </div>
    )
  }

  const AddAvatar = ({ username }) => {
    const bg = ['#c2410c', '#3f6212', '#065f46', '#0c4a6e', '#1e3a8a', '#4c1d95', '#831843'];
    const getRandomColor = Math.floor(Math.random() * 7);

    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bg[getRandomColor] }}
      >
        <p className="text-xl font-bold text-white">{username?.charAt(0)?.toUpperCase()}</p>
      </div>
    );
  };

  function Capitalize(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const FriendlistCard = ({ item, addUser, removeUser, addBackUser }) => {
    return (
      <div className='rounded-xl shadow w-[95%] p-5 justify-between items-center flex'>
        <div className='flex items-center gap-2'>
          <AddAvatar username={item?.username} />
          <p className='font-bold text-md'>{Capitalize(item?.username)}</p>
        </div>
        {addUser ? <button onClick={() => AddFriendToList(item.userid)} className="px-8 py-1 border-1 border  bg-[#3A6EDE] text-white rounded-md active:bg-blue-600" >Add +</button> : <></>}
        {addBackUser ? <button onClick={() => AddFriendToList(item.userid)} className="px-8 py-1 border-1 border  bg-[#3A6EDE] text-white rounded-md active:bg-blue-600" >Add Back+</button> : <></>}
        {removeUser ? <button onClick={() => RemoveFriendFromList(item.userid)} className="px-8 py-1 border-1 border  border-[#e11d48] text-[#e11d48] rounded-md active:bg-red-50" >Remove</button> : <></>}
      </div>
    )
  }

  const Home = () => {
    const [toggleedit, setToggleEdit] = useState(false);
    const [usname, setUsname] = useState(username)

    const handleEditUSname = () => {
      if (usname === username) {
        setToggleEdit(false);
      } else {
        const reqbody = { userid, username: usname }
        EditUserName(reqbody).then((res) => {
          if (res.status) {
            setToggleEdit(false);
            toast.success("Updated!");
            setUsername(usname);
            sessionStorage.setItem('name', usname);
          } else {
            toast.success(res.message);
          }
        })
      }
    }

    const handleDeleteUser = () => {
      const confirm = window.confirm("Are you sure?");
      if(confirm){
        DeleteUser(userid).then((res) => {
          if(res.status){
            toast.success("User is deleted!")
            sessionStorage.clear();
            setUserid(null);
            setUsername('');
          } else{
            toast.error(res.message)
          }
        })
      }
    }
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-[500px] h-[96%] overflow-y-auto fixed rounded-xl shadow'>
          <div className='flex flex-1 justify-between px-5 my-5'>
            <div className='flex items-center gap-2'>
              <AddAvatar username={username} />
              {
                !toggleedit ? <p className='font-bold text-lg'>{Capitalize(username)}</p> :
                  <input className=" mb-2 w-[200px] px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-0" onChange={(e) => setUsname(e.target.value)} value={usname}></input>
              }
            </div>
            <div className='flex gap-2'> 
              {
                toggleedit ?
                  <button onClick={() => { handleEditUSname() }} className="px-5 py-1 text-[#3A6EDE] rounded-md active:bg-blue-50">
                    Save
                  </button> : <button onClick={() => setToggleEdit(true)} className="px-5 py-1 text-[#3A6EDE] rounded-md active:bg-blue-50">
                    Edit
                  </button>
              }
              <button onClick={() => handleLogout()} className="px-5 py-1 border-1 border  border-[#3A6EDE] text-[#3A6EDE] rounded-md active:bg-blue-50">
                Logout
              </button>
              <div onClick={() => handleDeleteUser()} className='p-2 cursor-pointer rounded-full bg-red-50'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex flex-1'>
            <div onClick={() => setToggle('friendslist')} className={`flex-1 items-center text-center border-b border-b-1 pointer-cursor py-3 ${toggle === 'friendslist' ? 'border-b border-b-1 border-b-[#3A6EDE] text-[#3A6EDE] font-bold' : ''}`}>Friends List</div>
            <div onClick={() => setToggle('request')} className={`flex-1 items-center border-b border-b-1 text-center pointer-cursor py-3 ${toggle === 'request' ? 'border-b border-b-1 border-b-[#3A6EDE] text-[#3A6EDE] font-bold' : ''}`}>Requests</div>
            <div onClick={() => setToggle('adduser')} className={`flex-1 items-center border-b border-b-1 text-center pointer-cursor py-3 ${toggle === 'adduser' ? 'border-b border-b-1 border-b-[#3A6EDE] text-[#3A6EDE] font-bold' : ''}`}>Add Friends +</div>
          </div>
          <div className='overflow-y-auto'>
            {
              toggle === 'adduser' ?
                <div className='flex flex-col justify-center items-center gap-3 my-3 mt-3'>{
                  nonFriends?.length > 0 ?
                    nonFriends?.map((item, index) => <FriendlistCard key={index} addUser={true} item={item} />)
                    :
                    <p>No users available.</p>
                }
                </div>
                : <></>
            }
            {
              toggle === 'request' ?
                <div className='flex flex-col justify-center items-center gap-3 my-3 mt-3'>{
                  requests?.length > 0 ?
                    requests?.map((item, index) => <FriendlistCard key={index} addBackUser={true} item={item} />)
                    :
                    <p>No request.</p>
                }
                </div>
                : <></>
            }
            {
              toggle === 'friendslist' ?
                <div className='flex flex-col justify-center items-center gap-3 my-3 mt-3'>{
                  userList?.length > 0 ?
                    userList?.map((item, index) => <FriendlistCard key={index} removeUser={true} item={item} />)
                    :
                    <p>No friends added yet.</p>
                }
                </div>
                : <></>
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Toaster />
      {
        !username ? <LoginCard /> : <Home />
      }
    </div>
  );
}

export default App;
