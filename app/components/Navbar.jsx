import Link from 'next/link'
import Pic from './Pic.png'
import Image from 'next/image'

export default function Navbar() {
  return (
  <nav>
    <Image 
        src={Pic}
        alt='Bk helpdesk'
        width={70}
        quality={100}
        placeholder='blur'
        />
    <h2>bk helpdesk</h2>
    <Link href="/">Dashboard</Link>
    <Link href="/tickets">Tickets</Link>
  </nav>  
  )
}
