import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  
  const [users, setUsers] = useState([])

  function delUser(id) {

    axios
      .delete('http://localhost:9090/api/users/'+id)
      .then(response => {       
        //setUsers(response.data);     
        console.log(response.data);
        const usersUpdated = users.filter(u => u.id !== id); //Filter your list of users and remove the one for the specific id
        setUsers(usersUpdated); //This updates your state
      })
      .catch(error => {
        console.log('Server Error', error);
      });
     
  }
  

  useEffect(() => {
   
    const getUsers = () => {
      axios
        .get('http://localhost:9090/api/users')
        .then(response => {
          setUsers(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log('Server Error', error);
        });
    }
    
    getUsers();
  }, []);
  


  return (
    <div className="App">
      <header className="App-header">
        <h2>Client App For User</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Bio</th>
            <th>Actions</th>            
          </tr> 
          {users.map(user => (  
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.bio}</td>   
              <td><a href="javascript:" onClick={() => delUser(user.id)}>Delete</a> | <a href="">Edit</a></td>         
            </tr>
          ))}
        </table>    
    
      </header>
    </div>
  );
}

export default App;
