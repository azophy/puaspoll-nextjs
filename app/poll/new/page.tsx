'use client'

import { useState, useRef } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'
import Navbar from '../../../components/nav'

export default function Vote(props: any) {
  const router = useRouter()
  const recaptchaRef = useRef<any>(null)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('ready')
  const [choices, setChoices] = useState([] as string[])

  function setChoice(idx:number, val:string) {
    let newChoices: string[] = choices.slice()
    newChoices[idx] = val

    setChoices(newChoices)
  }

  const submitData = async () => {
    try {
      setStatus('loading...')
      const recaptchaToken = await recaptchaRef.current?.getValue();
      if (!recaptchaToken) throw new Error('Recaptcha validation does not passed')
      const body = { title, choices, recaptchaToken };
      
      let res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      let res_data = await res.json()
      if (res_data.ok) {
        alert('Success. redirecting...');
        await router.push(`/poll/${res_data.data.id}`);
      } else setStatus('failed');
    } catch (err: any) {
      console.error(err);
      setStatus(`error: ${err.message}`)
    }

  };

  function delChoice(idx:number) {
    let newChoices: string[] = choices.slice()
    delete newChoices[idx]

    setChoices(newChoices)
  }

  return (
  <main className="min-h-screen grid items-center justify-center">
    <div className="bg-gray-200 p-6 text-gray-900">
      <Navbar />
      <h1 className="text-3xl font-bold">Create new Poll</h1>

      {status != 'ready' && (
        <span>{status}</span>
      )}

      {status == 'ready' && (
      <form className="flex flex-col gap-4 mt-4">
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
            <button type="button"
                    className="bg-blue-600 p-2 ml-2 cursor-pointer hover:bg-blue-300 hover:underline"
                    onClick={() => delChoice(idx)}
            >x</button>
          </span>
        ))}

        <button type="button"
                onClick={() => setChoices(choices.concat([""]))}
                className="bg-blue-600 p-2 cursor-pointer hover:bg-blue-300 hover:underline"
        >add choice</button>

        <ReCAPTCHA size="normal"
                   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} 
                   ref={recaptchaRef}
        />
        <button type="button"
                className="bg-blue-600 p-2 cursor-pointer hover:bg-blue-300 hover:underline"
                onClick={submitData}
        >Submit</button>
      </form>
      )}
    </div>
  </main>
  )
}
