import React from 'react'
import { surpriseMePrompts } from '../utility/constant'


export function GetRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length )
  return surpriseMePrompts[randomIndex]
}