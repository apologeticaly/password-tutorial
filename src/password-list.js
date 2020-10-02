import React from 'react';
import { connect, useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePassword } from './actions';

function PasswordList() {
  const passwords = useSelector((state) => state.passwords)
  const dispatch = useDispatch()

  const passwordList = passwords.map((pass, index) => {
    return (
      <tr key={index}>
        <td>{pass.name}</td>
        <td>{pass.password}</td>
        <td><button onClick={(e) => {
            dispatch(deletePassword(index))
          }}>Delete</button></td>
      </tr>)
  })
  
  return (
    
    <table>
      <tr>
        <th>Name</th>
        <th>Password</th> 
        <th>Delete</th>
      </tr>
      {passwordList}
    </table>
  )
}

export default PasswordList