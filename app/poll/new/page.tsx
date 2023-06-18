'use client'

import React, { useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/nav'

export default function Vote(props: any) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [choices, setChoices] = useState([])

  function setChoice(idx:number, val:string) {
    let newChoices = choices.slice()
    newChoices[idx] = val

    setChoices(newChoices)
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, choices };
      
      let res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      let res_data = await res.json()
      if (res_data.ok) {
        alert('Success');
        await router.push(`/poll/${res_data.data.id}`);
      } else alert('failed');
    } catch (error) {
      console.error(error);
      alert(error)
    }

  };

  function delChoice(idx:number) {
    let newChoices = choices.slice()
    delete newChoices[idx]

    setChoices(newChoices)
  }

  return (
  <main className="min-h-screen grid items-center justify-center">
    <div className="bg-gray-200 p-6 text-gray-900">
      <Navbar />
      <form onSubmit={submitData} className="flex flex-col gap-4 mt-4">
        <span className="flex gap-4">
          <label htmlFor="">Title</label>
          <input type="text" 
                 value={title}
                 onInput={e => setTitle(e.currentTarget.value)} 
          />
        </span>
        {choices.map((choice: any, idx:number) => (
          <span key={idx}>
            <input type="text"
                   value={choice}
                   onInput={e => setChoice(idx, e.currentTarget.value)} 
            />
            <buttom type="button"
                    className="bg-blue-600 p-2 ml-2 cursor-pointer hover:bg-blue-300 hover:underline"
                    onClick={() => delChoice(idx)}
            >x</buttom>
          </span>
        ))}
        <button type="button"
                onClick={() => setChoices(choices.concat([""]))}
                className="bg-blue-600 p-2 cursor-pointer hover:bg-blue-300 hover:underline"
        >add choice</button>
        <button type="submit"
                className="bg-blue-600 p-2 cursor-pointer hover:bg-blue-300 hover:underline"
        >Submit</button>
      </form>
    </div>
  </main>
  )
}
