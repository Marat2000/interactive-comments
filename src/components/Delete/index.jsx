import style from './Delete.module.css'

const Delete=({setDeleteClicked, comments , setComments, item})=>{

const buttonClick=()=>{
	setDeleteClicked(false)
}

const remove=()=>{
	let arr=[...comments]
	arr.splice(item.id-1,1)
	setComments([...arr])
}


	return(
	<div className={style.body}>
	<div className={style.main}>
	<div className={style.container}>
	<h6 style={{color:'var(--Dark)'}}>Delete comment</h6>
	<p className={style.title}>Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
	<div className={style.buttons}>
	<button className={style.cancel} onClick={buttonClick}>NO, CANCEL</button>
	<button className={style.delete} onClick={()=>{buttonClick(); remove()}}>YES, DELETE</button>
	</div>
	</div>

<div className={style.overlay}>	</div>
</div>
</div>
	)}
export default Delete
