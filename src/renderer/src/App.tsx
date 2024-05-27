import { Fragment } from 'react/jsx-runtime'
import { useState } from 'react'
import CryptoJs from 'crypto-js'

function App(): JSX.Element {
  const [boxes, setBoxes] = useState({
    encText: '',
    encPass: '',
    decText: '',
    decPass: '',
    encResult: 'encResult',
    decResult: 'decResult'
  })

  const handleChange = (e) => {
    setBoxes({ ...boxes, [e.target.name]: e.target.value })
  }

  const encryption = () => {
    try {
      const ans = CryptoJs.AES.encrypt(boxes.encText, boxes.encPass).toString()
      setBoxes({ ...boxes, encResult: ans })
    } catch (error) {
      console.log(error)
    }
  }

  const decryption = () => {
    try {
      const dText = CryptoJs.AES.decrypt(boxes.decText, boxes.decPass)
      if (dText) {
        const dTextStr = dText.toString(CryptoJs.enc.Utf8)
        if (dTextStr.length > 0) {
          setBoxes({ ...boxes, decResult: dTextStr })
        } else {
          setBoxes({ ...boxes, decResult: 'wrong key' })
        }
      } else {
        setBoxes({ ...boxes, decResult: 'wrong key' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const buttonStyle: React.CSSProperties = {
    width: '300px',
    padding: '10px',
    border: '1px solid red',
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    lineHeight: '17px'
  }

  return (
    <Fragment>
      <label htmlFor="encText">Enter text for encryption</label>
      <input
        name="encText"
        id="encText"
        type="text"
        onChange={handleChange}
        value={boxes.encText}
      />

      <label htmlFor="encPass">Enter decode password</label>
      <input
        name="encPass"
        id="encPass"
        type="text"
        onChange={handleChange}
        value={boxes.encPass}
      />

      <button onClick={encryption} name="encResult">
        Encrypt
      </button>
      <button onClick={async()=>{
        navigator.clipboard.writeText(boxes.encResult)
      }} name="encResult">
        copy
      </button>

      <p style={buttonStyle}>{boxes.encResult}</p>

      {/* dec */}
      <label htmlFor="decText">Enter text for decryption</label>
      <input
        name="decText"
        id="decText"
        type="text"
        onChange={handleChange}
        value={boxes.decText}
      />

      <label htmlFor="decPass">Enter decode password</label>
      <input
        name="decPass"
        id="decPass"
        type="text"
        onChange={handleChange}
        value={boxes.decPass}
      />

      <button onClick={decryption} name="decResult">
        Decrypt
      </button>

      <p style={buttonStyle}>{boxes.decResult}</p>

      <h1 className='text-red-700'>yashpal</h1>
    </Fragment>
  )
}

export default App
