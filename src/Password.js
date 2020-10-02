import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPassword } from './actions';
import zxcvbn from 'zxcvbn';
import PasswordList from './password-list';



function generatePassword(length) {
  const num = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  const lower = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]
  const upper = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
  const symbols = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96 , 122, 123, 124, 125, 126]
  const selection = []


  function getSelection() {
    let selection1 = []
    if (document.getElementById("num").checked === true){
      selection1 = selection1.concat(num)
    }
    if (document.getElementById("lower").checked === true){
      selection1 = selection1.concat(lower)
    }
    if (document.getElementById("upper").checked === true){
      selection1 = selection1.concat(upper)
    }
    if (document.getElementById("symbols").checked === true){
      selection1 = selection1.concat(symbols)
    }
    return selection1
  }

  getSelection()

  function random(range,offset=0) {
    return Math.floor(Math.random() * range + offset)
  }

  Array.prototype.random = function() {
    return this[random(this.length)]
  }

  var output = []

  for (let i = 0; i < length; i++) {
      output.push(String.fromCharCode(getSelection().random()))
  }


  function setStrength(password) {

    if (zxcvbn(password).score === 0) {
      document.getElementById('strength').innerHTML = "Strength: UNSAFE"
      document.getElementById('strength').style.backgroundColor = 'red'
    }
  
    if (zxcvbn(password).score === 1) {
      document.getElementById('strength').innerHTML = "Strength: Weak"
      document.getElementById('strength').style.backgroundColor = 'yellow'
    }
  
    if (zxcvbn(password).score === 2) {
      document.getElementById('strength').innerHTML = "Strength: Average"
      document.getElementById('strength').style.backgroundColor = 'orange'
    }
  
    if (zxcvbn(password).score === 3) {
      document.getElementById('strength').innerHTML = "Strength: Safe"
      document.getElementById('strength').style.backgroundColor = 'lightblue'
    }
  
    if (zxcvbn(password).score === 4) {
      document.getElementById('strength').innerHTML = "Strength: Secure"
      document.getElementById('strength').style.backgroundColor = 'lightgreen'
    }
  }

  setStrength(output.join(''));
  return output.join('')
  
  
}

function Password() {
  const [password, setPassword] = useState('p@$$w0rd')
  const [length, setLength] = useState(5)
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  
  return (
    <>
      <h1>Generate a Password</h1>
      <div>
      <div class="row">
        <div class="col">
        <div>
          <label htmlFor="password">Generated Password:</label>
        </div>
        <input
            value = {password}
            id="password"
        />
        </div>
      <div class="col">
          <div>
            <label htmlFor="length">Chars:</label>
          </div>
          <input
              id="length"
              type="number"
              min="1"
              max="99"
              onChange={(e) => setLength(e.target.value)}
              value={length}
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p id="strength" class="strength"></p>
        </div>
      </div>


        <div class="row">
          <input name="lower" id="lower" type="checkbox" defaultChecked={true}/>
          <label htmlFor="lower">Lower Case Letters</label>

          <input name="upper" id="upper" type="checkbox" defaultChecked={true}/>
          <label htmlFor="upper">Upper Case Letters</label>

          <input name="num" id="num" type="checkbox" defaultChecked={true}/>
          <label htmlFor="num">Numbers</label>

          <input name="symbols" id="symbols" type="checkbox" defaultChecked={true}/>
          <label htmlFor="symbols">Symbols</label>
        </div>
        <button onClick={(e) => {
          setPassword(generatePassword(length));
        }}>Generate</button>


      <div>
        <div></div>
      <h1>Save a Password</h1>
          <table>
            <tr>
              <th>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                defaultValue={"Enter a name"}
                />
              </th>
              <th>
                <input
                id="name"
                value={password}/>
              </th>
              <th>
                <div>
                  <button onClick={(e) => {
                    dispatch(addPassword(name, password))
                  }}>Save</button>

                </div>
              </th>
            </tr>
          </table>
      </div>
      <h1>Password Database</h1>
      <PasswordList/>
      </div>
    </>
  )
}

export default Password