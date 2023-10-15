import axios from "axios"
import { notFound } from "next/navigation"


export const dynamicParams=true

export async function generateStaticParams(){
    // [{id:'1'},{id:'2'},......]
    const res=await axios.get('http://localhost:4000/tickets/')
    const tickets =res.data
    return tickets.map((ticket)=>{
        id:ticket.id
    })

}


async function getTicket(id){
    try {
        const res = await axios.get("http://localhost:4000/tickets/" + id, {
          next: {
            revalidate: 60, // no cache with 0
          },
        });
    
        return res.data;
      } catch (error) {
        // Handle the 404 error by returning a "Not Found" page.
        return notFound();
      }
 }

export default async function TicketDetails({params}) {
    const ticket= await getTicket(params.id)
    if (!ticket) {
        return notFound();
      }
    return (
    <main>
        <nav>
            <h2>Tickets</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created By:{ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
        </div>
    </main>
  )
}
