import Message from './components/Message'
import WriteArea from './components/WriteArea'
import ReplyArea from './components/ReplyArea'
import data from './data.json'
import React from 'react'

export type comment = {
	id: number;
	content: string;
	createdAt: string;
	score: number;
	user: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
	replyingTo?: string;
	voteTime?:number;
	replies?:comment[];
};

const App:React.FC=()=> {

const [comments, setComments] = React.useState<comment[]>(data.comments);
const [replyText, setReplyText] = React.useState<string>("");
const [replyClicked, setReplyClicked] = React.useState<boolean>(false);
const [replyId, setReplyId] = React.useState<number>(0);
const [text, setText] = React.useState<string>("");

const replyRef = React.useRef<HTMLTextAreaElement>(null);
const inputRef = React.useRef<HTMLTextAreaElement>(null);
const commRef = React.useRef<HTMLDivElement>(null);

const allComments = () => {
	let arr:comment[] = [];
	data.comments.forEach((e) => {
		arr.push(e);
		if (e.replies) arr.push(...e.replies);
	});

	arr.forEach((e) => (e.voteTime = 0));
	setComments([...arr]);
};


React.useEffect(() => {
	allComments();
}, []);

React.useEffect(() => {
	comments.forEach((e, i) => (e.id = i + 1));
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

{replyId===user.id && replyClicked && 
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
