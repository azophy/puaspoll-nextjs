'use client'

import { useState } from 'react';

export default function Vote(props: any) {
  const [title, setTitle] = useState('')
  const [choices, setChoices] = useState([])

  function setChoice(idx:number, val:string) {
    let newChoices = choices.slice()
    newChoices[idx] = val

    setChoices(newChoices)
  }

  function delChoice(idx:number) {
    let newChoices = choices.slice()
    delete newChoices[idx]

    setChoices(newChoices)
  }

  return (
    <div className="bg-gray-200 p-6 text-gray-900">
      <form action="" className="flex flex-col gap-4">
        <span>
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
                    onClick={() => delChoice(idx)}
                    className="bg-blue-600 p-2 ml-4"
            >x</buttom>
          </span>
        ))}
        <button type="button"
                onClick={() => setChoices(choices.concat([""]))}
                className="bg-blue-600 p-2"
        >add choice</button>
      </form>
    </div>
  )
}
