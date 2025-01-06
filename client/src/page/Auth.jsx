import React,{useState} from 'react';
import { useUser } from '../context/UserContext';
import useMapClick from '../hook/useMapClick'

function Auth() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('');
  const [state,setState] = useState('signup');

  const { location, MapComponent } = useMapClick();
  const {signup,signin} = useUser();

  const createUser = () => {
    event.preventDefault()
    
    if(state === 'signup') signup(name,email,password,location);
    else    signin(email,password)
  }

  const changeState = () => {
    if(state == 'signup') setState('signin')
    else  setState('signup')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {
            state === 'signup'
            ? 'Sign Up'
            : "Sign in"
          }
        </h2>
        
        <form>
          {
            state === 'signup' 
            && 
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
            </div>
          }

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            />
          </div>

          {
            state === 'signup' 
            && 
            <div className="mb-4">
              <p className="block text-gray-700 font-medium mb-2">Add Location:</p>
              <div style={{ height: "400px", width: "100%", marginBottom: "20px" }}>
                <MapComponent />
              </div>
              {location && (
                <p>
                  Selected Location: {location[0]}, {location[1]}
                </p>
              )}
            </div>
          }
          
          <button
            type="submit"
            onClick={createUser}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {
              state == 'signup'
              ? 'Sign Up'
              : "Sign in"
            }
          </button>
        </form>

        <p>
          {
            state == 'signup'
            ? 'Already '
            : "Don't "
          }   
          have an account ?
          <span className='text-blue-500 cursor-pointer' onClick={changeState}>
            {
              state == 'signup'
              ? ' sign in'
              : " sign up"
            }
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;