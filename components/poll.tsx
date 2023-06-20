'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'

const pollLimit = 100 // budget limit for this poll

const PollItem = (props:any) => {  
    return (
      <div className="bg-blue-300 my-4 p-2">

        <span className="m-2">
        {props.label} ({props.count} poll, cost {props.count**2})
        </span>

        <input type="range" 
          value={props.count} 
          min="0" 
          max="10" 
          onInput={e => props.updateCount(e.currentTarget.value)} 
        />

      </div>
    )
}

export default function Poll(props: any) {
  const router = useRouter()
  const recaptchaRef = useRef()

  const [options, setOptions] = useState(
    props.choices.map((choice: any) => ({ id: choice.id, label: choice.label, count: 0}) )
  )

  function countTotalVote() {
    return options.reduce((sum:number, i:any) => sum + i.count**2 , 0)
  }

  function setCount(idx:number, val:number) {
    let newOptions = options.slice()
    newOptions[idx].count = val

    setOptions(newOptions)
  }

  async function handleSubmit() {
    try {
      const recaptchaToken = await recaptchaRef.current?.getValue();
      if (!recaptchaToken) throw new Error('Recaptcha validation does not passed')

      const body = { 
        poll_id: props.poll_id,
        title: props.title,
        choices: options,
        recaptchaToken,
      };
      
      let res = await fetch('/api/polls/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      let res_data = await res.json()
      if (res_data.ok) {
        alert('Success');
        await router.refresh();
      } else alert('failed');
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  const remainingBudget = pollLimit - countTotalVote()
  const isOverBudget = remainingBudget < 0

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-3xl font-bold">{props.title}</h1>

      <div className={ isOverBudget ? 'bg-red-300' : 'bg-green-300' }>
        Remaining poll budget: {remainingBudget}
      </div>

      { options.map(
          (item:any, idx:number) => <PollItem 
              label={item.label} 
              count={item.count} 
              key={item.id}
              updateCount={(val:number) => setCount(idx,val)}
              />
      )}

      <ReCAPTCHA size="normal"
                 sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} 
                 ref={recaptchaRef}
      />
      <button type="button"
              disabled={isOverBudget}
              className={isOverBudget ? 'bg-gray-300 p-4' : 'bg-blue-300 hover:bg-blue-600 hover:underline cursor-pointer p-4'}
              onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}
