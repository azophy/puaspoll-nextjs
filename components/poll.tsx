'use client'

import { useState } from 'react';

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
  console.log('ok')
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
    alert('ok')
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
