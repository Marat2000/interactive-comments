import Message from './components/Message'
import WriteArea from './components/WriteArea'
import ReplyArea from './components/ReplyArea'

import data from './data.json'
import React from 'react'


function App() {

const [comments, setComments]=React.useState( data.comments)
const [replyText , setReplyText]=React.useState('')
const [replyClicked, setReplyClicked]=React.useState(false)
const [replyId, setReplyId]=React.useState(0)
const [text,setText]=React.useState('')

const replyRef=React.useRef(null)
const inputRef=React.useRef(null)
const commRef=React.useRef(null)


const allComments = () => {
	let arr = [];
	data.comments.forEach((e) => {
		arr.push(e);
		if (e.replies) arr.push(...e.replies);
	});
		
	arr.forEach(e=>e.voteTime=0)
	setComments([...arr]);
};


React.useEffect(() => {
	allComments();
}, []);

React.useEffect(() => {
	comments.forEach((e,i)=>e.id=i+1)
}, [comments]);




  return (<>
<div className='comments' ref={commRef}>
{comments.map( user=>{return(
<div className={user.replyingTo && 'replyedContainer'} key={user.id}>
<Message 
text={text}
inputRef={inputRef}
user={data.currentUser}
setText={setText}
comments={comments}
setComments={setComments}
item={user}
setReplyClicked={setReplyClicked}
replyClicked={replyClicked}
setReplyText={setReplyText}
replyRef={replyRef}
replyText={replyText}
replyId={replyId}
setReplyId={setReplyId}/>


{replyId===user.id&&replyClicked && 
	<ReplyArea 
	replyRef={replyRef} 
	replyText={replyText}  
	setReplyText={setReplyText} 
	user={data.currentUser} 
	setComments={setComments} 
	comments={comments} 
	item={user} 
	setReplyClicked={setReplyClicked}/>}


</div>)})}
</div>

<WriteArea
user={data.currentUser}
setComments={setComments}
comments={comments}
text={text}
inputRef={inputRef}
setText={setText}
commRef={commRef}
/>
</>)}


export default App;
