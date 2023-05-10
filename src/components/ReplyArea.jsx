import React from 'react'
const ReplyArea=({user, setComments , comments , item, setReplyClicked, replyText ,replyRef, setReplyText})=>{

let imageUrl=user.image.png

const reply=()=>{
	if(replyText){
		let newReply={
				"id": item.id+1,
			    "content": replyText ,
			    "score": 0,
			    "user":{...user} ,
			    "replyingTo":item.user.username,
			    "replies": [],
			    "createdAt":"Now"
		}
	
	
		replyText && comments.splice(item.id,0,newReply)
		comments.forEach((e,i)=>e.id=i+1)
		
		setReplyText('')
		setComments([...comments])
		setReplyClicked(false)}}

const textChange=(e)=>{
setReplyText(e.target.value)
}

React.useEffect(()=>{
replyRef.current?.focus()
},[])


	return(
	<div className={`WriteArea  ${item.replyingTo && ' replyedMessage' }`}>
<img className='avatar' src={imageUrl} alt='currentAvatar'/>
<textarea className='textArea' placeholder='Add a comment...' ref={replyRef} value={replyText} onChange={textChange}></textarea>	
<button className='userBtn' onClick={reply}>REPLY</button>
</div>
	)
}
export default ReplyArea
