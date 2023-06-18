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
  const [options, setOptions] = useState(
    props.choices.map((val: any) => ({ label: val, count: 0}) )
  )

  function countTotalVote() {
    return options.reduce((sum:number, i:any) => sum + i.count**2 , 0)
  }

  function setCount(idx:number, val:number) {
    let newOptions = options.slice()
    newOptions[idx].count = val

    setOptions(newOptions)
  }

  const remainingBudget = pollLimit - countTotalVote()

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-3xl font-bold">{props.title}</h1>

      <div className={ remainingBudget < 0 ? 'bg-red-300' : 'bg-green-300' }>
        Remaining poll budget: {remainingBudget}
      </div>

      { options.map(
          (item:any, idx:number) => <PollItem 
              label={item.label} 
              count={item.count} 
              key={item.label}
              updateCount={(val:number) => setCount(idx,val)}
              />
      )}
    </div>
  )
}
