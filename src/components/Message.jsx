import Delete from './Delete'
import React from 'react'


const Message=({
item ,
text , 
user ,
setText , 
inputRef ,
comments ,
setComments ,
replyClicked ,
setReplyClicked , 
setReplyText , 
replyRef ,
replyText ,
replyId , 
setReplyId })=>{
const [deleteClicked , setDeleteClicked]=React.useState(false)
const [editClicked , setEditClicked]=React.useState(false)
const [updateContent , setUpdateContent]=React.useState()
const scoreRef=React.useRef(null)


console.log( item.content.split('').splice(0,10).join('')+'::'+comments[item.id-1].score )

let author=item.user.username
let time=item.createdAt
let content=item.content
let imageUrl=item.user.image.png
let replyTo=item.replyingTo

React.useEffect(()=>{
	setUpdateContent(content)
},[comments])

const onReply=(name)=>{

	if(replyClicked){
		setReplyText(replyText+' @'+name+', ')
		replyRef.current.focus()}
	else { 
		setText(text+' @'+name+', ')
		inputRef.current.focus()
	}
	}

const onDelete=()=>{
	setDeleteClicked(!deleteClicked)
}

const onEdit=()=>{
	setEditClicked(!editClicked)
}

const onUpdate=()=>{

	updateContent && setEditClicked(false)
	comments[item.id-1].content=updateContent
	setComments([...comments])
}

const editAreaChange=(e)=>{
	setUpdateContent(e.target.value)
}

const replyBtnClick=()=>{
	setReplyClicked(!replyClicked)
	setReplyId(item.id)
}

function voteBtnColor(){
	if(scoreRef.current){
		if(item.voteTime==0)
		scoreRef.current.style.color='hsl(238, 30%, 72%)'
		else if(item.voteTime==1)
		scoreRef.current.style.color='var(--Blue)'
		else if(item.voteTime==-1)
		scoreRef.current.style.color='var(--Red)'}}


React.useEffect(()=>{
	voteBtnColor()

},[item.voteTime])

const onPlus=()=>{
	if(item.voteTime===0 || item.voteTime===-1)
	{item.score++
	item.voteTime++
	setComments([...comments])}
}
const onMinus=()=>{
	if(item.voteTime===0 || item.voteTime===1)

	{item.score--
	item.voteTime--
	setComments([...comments])
	}
}


const plusIcon=()=>{return(<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg>)}

const minusIcon=()=>{return(
	<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg>)}


	return(<>
		{deleteClicked && <Delete setDeleteClicked={setDeleteClicked} comments={comments} item={item} setComments={setComments}/>}
		<div  className={`message ${replyTo && ' replyedMessage'}`}>
		<div className='vote'>
		<button className='voteButton' onClick={onPlus}> {plusIcon()}  </button>
		<p  ref={scoreRef}>{ item.score }</p>
		<button className='voteButton' onClick={onMinus}> {minusIcon()} </button>
		</div>
		<div className='info'>
		<img alt='avatar' className='avatar' src={imageUrl} />
		<div className='name'onClick={()=>onReply(author)}>{author}</div>
		{ author===user.username && <div className='you'>you</div>}
		<p className='time'>{time}</p>
	
		</div>
		{ !editClicked ?
			author===user.username  ?
			<div style={{display:'flex' , gap:'15px' , placeSelf:'end',}} >
			<button className='deleteBtn' onClick={onDelete}><img src={require('.././images/icon-delete.svg').default} alt='deleteIcon'/> Delete </button>
			<button className='editBtn' onClick={onEdit}><img src={require('.././images/icon-edit.svg').default} alt='editIcon'/> Edit </button>
		</div>
		:<button className='replyBtn' onClick={replyBtnClick}><img src={require('.././images/icon-reply.svg').default} alt='replyIcon'/> Reply </button>
		: <button className='userBtn' style={{marginLeft:'auto'}} onClick={onUpdate}>UPDATE</button>	

	}
		{editClicked?
			<textarea className='text textArea' onChange={editAreaChange}>{content}</textarea>
			:<p className='text'> <span className='userName' onClick={()=>onReply(replyTo)}>{replyTo?'@'+replyTo:''}</span> {content}</p>}
		</div> 

		
		
 
</>
		)
}

export default Message