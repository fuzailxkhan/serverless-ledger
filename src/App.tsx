import { useState } from 'react'
import './App.css'
import LoginPage from './page/login-page';
import ExpensesPage from './page/expenses-page';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () =>{
    setIsLoggedIn(true);
  }

  return (
    <div>
      {
      isLoggedIn?

      <div>
        <ExpensesPage/>
      </div>:

      <div>
        <LoginPage onLogin={onLogin}/>
      </div>
        
        }
    </div>
  )
}

export default App
