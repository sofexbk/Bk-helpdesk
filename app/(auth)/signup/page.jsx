"use client"


import { useState } from "react"
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


import AuthForm from "../AuthForm"

export default function Signup() {
  const [error, setError] = useState('')
  const router =useRouter()

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    setError('')
    const supbase=createClientComponentClient() 
    const {error}=await supbase.auth.signUp({
      email, 
      password,
      options:{
        emailRedirectTo:`${location.origin}/api/auth/callback`
      }
    })
    if(error){
      setError(error.message)
    }else{
      router.push('/verify')
    }
  }

  return (
    <main>
      <h2 className="text-center">Sign up</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}