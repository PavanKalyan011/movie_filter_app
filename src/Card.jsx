import React, { useEffect, useState } from 'react'
import Db_instance from './Database/Db_instance'

const Card = () => {
   let [state,setState] =useState([])
   let [filtered,setFiltered]=useState([])
   let[from,setFrom]=useState("")
   let[to,setTo]=useState("")
   
let fetch=()=>{
    let x=Db_instance.get("/movie");
    x.then((res)=>{
      setState(res.data)
      setFiltered(res.data)
    
    })
}
useEffect(()=>{
    fetch()
},[])


const formatDate=(date)=>{
  let [day,month,year]=date.split("-");
  return (`${year}-${month}-${day}`)
}

useEffect(()=>{
 
  setFiltered(
    state.filter((obj)=>{
     let newdate= formatDate(obj.release_date)
      console.log(newdate)
        return (!from ||newdate>=from) && (!to ||newdate<=to)
    }))
},[from,to])
   

  return (

    <>
    <h1 className='font-bold text-2xl text-center'>Movies</h1>
   <div className='flex my-10 justify-center gap-[100px]'>
    <div className='flex gap-10'>
    <label htmlFor="from" className='font-semibold'>FROM</label>
    <input type="date" name="from" id="from" className='border-2 border-black ' value={from} onChange={(e)=>{setFrom(e.target.value)}} />
    </div>
    <div className='flex gap-6'>
    <label htmlFor="to" className='font-semibold'>TO</label>
    <input type="date" name="to" id="to" className='border-2 border-black' value={to} onChange={(e)=>{setTo(e.target.value)}} />
   </div>
   </div>

 
   <div  className='flex flex-wrap border-4 border-black gap-5 bg-black p-5'> 
   
      {filtered.map(({ img, description, release_date }, index) => {
        return <div  key={index}  className='h-[300px] w-[300px] border flex flex-col items-center gap-4 bg-white justify-center'>
          <img src={img}  className='h-[200px] w-[200px]' />
          <p className='font-semibold'>{description}</p>
          <p>{release_date}</p>
        </div>
      })}
    </div></>
  )

}

export default Card;
