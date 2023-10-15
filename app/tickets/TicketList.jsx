import axios from "axios"
import Link from "next/link";
async function getTickets(){
   const res= await axios.get('http://localhost:4000/tickets',{
    next:{
        revalidate:0 //no cache
    }
   })
   return res.data;
}


export default async function ticketList() {
  //fetch data
  const tickets =await getTickets();
    return (
    <>
      {tickets.map((ticket)=>(
        <div key={ticket.id} className="card my-5">
           <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0,200)}...</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
            </Link>
        </div>
      ))
      }
      {tickets.length===0 &&( 
        <p className="text-center">There are no open tickets ,yay!!</p>
      )}
    </>
  )
}


///tickets/id