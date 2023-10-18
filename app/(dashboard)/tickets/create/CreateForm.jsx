"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e)  => {
    e.preventDefault()
    setIsLoading(true)

    const newTicket = { title, body, priority, user_email: 'mario@netninja.dev' }
    
    const res = await fetch('http://localhost:3000/api/tickets', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket)
    });
    
    try {
      const text = await res.text(); // Get the response text
    
      if (res.ok) {
        // Check if the response status is OK
        if (text) {
          const json = JSON.parse(text); // Try to parse the response as JSON
          if (json.error) {
            console.error(json.error);
          }
          if (json.data) {
            router.refresh();
            router.push('/tickets');
          }
        } else {
          console.error("Response is empty or doesn't contain JSON data");
        }
      } else {
        console.error(`API request failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    
    
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Title:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select 
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button 
        className="btn-primary" 
        disabled={isLoading}
      >
      {isLoading && <span>Adding...</span>}
      {!isLoading && <span>Add Ticket</span>}
    </button>
    </form>
  )
}