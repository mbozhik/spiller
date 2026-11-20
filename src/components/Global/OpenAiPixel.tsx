'use client'

import {useEffect} from 'react'

type MeasurementPixel = (
  ...command: [action: 'init', options: {pixelId: string}] | [action: 'measure', event: 'checkout_started', data: {type: 'contents'}]
) => void

declare global {
  interface Window {
    oaiq?: MeasurementPixel
  }
}

function initializeMeasurementPixel() {
  if (process.env.NODE_ENV !== 'production') return
  if (window.oaiq) return window.oaiq

  const queue: MeasurementPixel & {q: IArguments[]} = Object.assign(
    function () {
      queue.q.push(arguments)
    },
    {q: []},
  )
  window.oaiq = queue
  queue('init', {pixelId: 'T8spJFAgi5tDbHceMWcVSk'})

  const sdk = document.createElement('script')
  sdk.async = true
  sdk.src = 'https://bzrcdn.openai.com/sdk/oaiq.min.js'
  document.head.appendChild(sdk)

  return queue
}

export function measureCheckoutStarted() {
  initializeMeasurementPixel()?.('measure', 'checkout_started', {type: 'contents'})
}

export default function OpenAiPixel() {
  useEffect(() => {
    initializeMeasurementPixel()
  }, [])

  return null
}
