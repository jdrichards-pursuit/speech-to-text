import { useState } from 'react'

import { useSpeechRecognition } from './hooks/useSpeechRecognition'

function App() {
  const {
    text,
    startListening,
    stopListening,
    pauseListening,
    isListening,
    isPaused,
    hasRecognitionSupport,
  } = useSpeechRecognition()

  const [finalTranscript, setFinalTranscript] = useState([])

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          {!isListening ? (
            <button onClick={startListening}>Start</button>
          ) : (
            <button
              onClick={() => {
                setFinalTranscript([...finalTranscript, text])
                stopListening()
              }}
            >
              Stop
            </button>
          )}

          {/* {isPaused && <button onClick={startListening}>Continue</button>} */}

          {/* {isListening && (
            <button
              onClick={(prev) => {
                console.log('pause ran')
                setFinalTranscript(text)
                pauseListening()
              }}
            >
              Pause
            </button>
          )} */}
          {isListening && <p>Your browser is listening</p>}

          <p>{text}</p>
          {console.log(finalTranscript)}
        </>
      ) : (
        <>
          <h1>Your Browser Has No Recognition Support</h1>
        </>
      )}
    </div>
  )
}

export default App
