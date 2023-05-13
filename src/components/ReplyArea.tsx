import React from 'react'
import {comment} from '../App'
import {userType} from './Message'

type ReplyProps={
user:userType;
item:comment;
comments:comment[];
replyText:string;
replyRef:React.RefObject<HTMLTextAreaElement>;
setComments:React.Dispatch<React.SetStateAction<comment[]>>;
setReplyClicked:React.Dispatch<React.SetStateAction<boolean>>;
setReplyText:React.Dispatch<React.SetStateAction<string>>;
}

const ReplyArea:React.FC<ReplyProps>=({
user , 
item , 
comments ,
setComments , 
setReplyClicked , 
replyText ,
replyRef , 
setReplyText})=>{

let imageUrl=user.image.png

const reply = () => {
	let arr = [...comments];
	if (replyText) {
		let newReply = {
			id: item.id + 1,
			content: replyText,
			score: 0,
			user: { ...user },
			replyingTo: item.user.username,
			replies: [],
			createdAt: "Now",
			voteTime: 0,
		};

		replyText && arr.splice(item.id, 0, newReply);
		arr.forEach((e, i) => (e.id = i + 1));
		setReplyText("");
		setComments([...arr]);
		setReplyClicked(false);
	}
};


const textChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
setReplyText(e.target.value)
}

React.useEffect(()=>{
if(replyRef.current)
replyRef.current.focus()
},[])

	return (
		<div className={`WriteArea  ${item.replyingTo && " replyedMessage"}`}>
			<img className="avatar" src={imageUrl} alt="currentAvatar" />
			<textarea
				className="textArea"
				placeholder="Add a comment..."
				ref={replyRef}
				value={replyText}
				onChange={textChange}
			></textarea>
			<button className="userBtn" onClick={reply}>
				REPLY
			</button>
		</div>
	);
}
export default ReplyArea
