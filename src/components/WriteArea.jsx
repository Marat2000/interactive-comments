import React from 'react'

const WriteArea=({user, setComments , comments ,commRef, text , setText , inputRef})=>{

let imageUrl=user.image.png
const [sent,setSent]=React.useState(false)

const delay=()=>{return new Promise(resolve=>{setTimeout( resolve(), 10000 )})}

const send=()=>{
	setSent(false)
	text && setComments([...comments ,{
		      "id": comments.length+1,
		      "content": text ,
		      "score": 0,
		      "user":{...user} ,
		      "replies": [],
		      "createdAt":"Now",
		    }])
	
	setText('')
	
	delay().then(()=>setSent(true))
	}

React.useEffect(()=>{
	commRef.current.scrollTop = commRef.current.scrollHeight;

},[sent])

const textChange=(e)=>{
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