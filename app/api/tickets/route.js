// /api/tickets 
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamis='force-dynamic'

export async function GET(){
  const res= await axios.get('http://localhost:4000/tickets')
  const tickets=await res.data

  return NextResponse.json(tickets,{
    status:200 
  })
}