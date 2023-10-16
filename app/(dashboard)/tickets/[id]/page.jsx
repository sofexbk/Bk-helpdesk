import { notFound } from "next/navigation"
import axios from "axios"

export const dynamicParams = true // default val = true

export async function generateMetadata({ params }) {
  const id = params.id;

  try {
    const res = await axios.get(`http://localhost:4000/tickets/${id}`);
    const ticket = res.data;

    return {
      title: `Bk Helpdesk | ${ticket.title}`,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function generateStaticParams() {
  const res = await axios.get('http://localhost:4000/tickets')

  const tickets = await res.data
 
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(notFound()); 
    }
    return Promise.reject(error); 
  }
);

async function getTicket(id) {
  try {
    const res = await axios.get(`http://localhost:4000/tickets/${id}`, {
      next: {
        revalidate: 60
      }
    });

    if (!res.data) {
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}