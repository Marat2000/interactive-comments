import React from 'react'
import {comment} from '../App'
import {userType} from './Message'

type WritePros={
user:userType;
comments:comment[];
text:string;
setComments:React.Dispatch<React.SetStateAction<comment[]>>;
setText:React.Dispatch<React.SetStateAction<string>>;
commRef:React.RefObject<HTMLDivElement>;
inputRef:React.RefObject<HTMLTextAreaElement>;
}

const WriteArea:React.FC<WritePros>=({
user,
setComments,
comments,
commRef,
text,
setText,
inputRef,
})=>{

let imageUrl=user.image.png
const [sent,setSent]=React.useState<boolean>(false)

const delay=()=>{return new Promise<void>(resolve=>{setTimeout(()=>resolve(), 0 )})}

const send=()=>{
	setSent(false)
	text && setComments([...comments ,{
		      "id": comments.length+1,
		      "content": text ,
		      "score": 0,
		      "user":{...user} ,
		      "replies": [],
		      "createdAt":"Now",
		      "voteTime":0
		    }])
	
	setText('')
	
	delay().then(()=>setSent(true))
	}

React.useEffect(() => {
	if (commRef.current)
		commRef.current.scrollTop = commRef.current.scrollHeight;
}, [sent]);

const textChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
setText(e.target.value)
}

return(
<div className='WriteArea'>
<img className='avatar' src={imageUrl} alt='currentAvatar'/>
<textarea className='textArea' ref={inputRef} placeholder='Add a comment...' value={text} onChange={textChange}></textarea>	
<button className='userBtn' onClick={send}>SEND</button>
</div>
)
}
export default WriteArea