// /api/tickets 
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamis='force-dynamic'

export async function GET(_,{params}){

  const id=params.id
  const res= await axios.get(`http://localhost:4000/tickets/${id}`)
  const tickets=await res.data
  if(res.data==null){
    return NextResponse.json({error:'Cannot find the ticket'},{
        status:404
    })
  }
  return NextResponse.json(tickets,{
    status:200 
  })
}