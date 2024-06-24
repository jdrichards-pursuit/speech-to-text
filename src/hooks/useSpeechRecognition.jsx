import { useState, useEffect } from 'react'

let recognition = null
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = 'en-US'
}

export function useSpeechRecognition() {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const startListening = () => {
    setIsPaused(false)
    setIsListening(true)
    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
    recognition.stop()
  }

  const pauseListening = () => {
    setIsPaused(true)
    setIsListening(false)
    recognition.stop()
  }

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')

        setText(transcript)
        console.log('result', event)
      }
    }
  }, [])

  return {
    text,
    isListening,
    isPaused,
    startListening,
    stopListening,
    pauseListening,
    hasRecognitionSupport: !!recognition,
  }
}
