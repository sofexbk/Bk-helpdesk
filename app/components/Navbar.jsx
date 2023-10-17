import Link from 'next/link'
import Pic from './Pic.png'
import Image from 'next/image'
import LogoutButton from './LogoutButton'

export default function Navbar({user}) {
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
    <Link href="/tickets" className='mr-auto'>Tickets</Link>
    {user && (
      <span>Hello,{user.email}</span>
    )}
    <LogoutButton/>
  </nav>  
  )
}
