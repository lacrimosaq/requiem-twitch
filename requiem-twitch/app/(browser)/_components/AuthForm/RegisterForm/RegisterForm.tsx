
import { useState, useRef, Component } from 'react';
import { useRouter } from 'next/router'
import { CircleX } from 'lucide-react';

const RegisterForm = ({stateChanger, ...rest}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string| null>(null);
  const [isLoading, startLoading] = useState(false);
  // const router = useRouter();
  const isEmptyLabels = username.length === 0 || email.length === 0|| password.length === 0;



  const RegisterApi = (e) => {
    e.preventDefault();
    startLoading(true);
        let registerobj = {
            "email" : email, 
            "username" : username,
            "password" : password, 
        };
        console.log(registerobj);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(registerobj)
        }).then(resp => {
          if (!resp.ok) {
            return resp.text().then(text => { throw new Error(text); });
          }
          const contentType = resp.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return resp.json();
          } else {
            return resp.text();
          }
        }).then(json => {
            localStorage.setItem('id', json.user.id);
            localStorage.setItem('username', json.user.username);
            localStorage.setItem('jwtToken', json.token);
            localStorage.setItem('avatar', json.user.avatar);
            location.reload(); 
        }).catch((err) => {
            console.log('Failed :' + err.message);
            setError(err.message);
        }).finally(() =>{
          startLoading(false);
        });
    
}

  return (
    <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-black text-neutral-100">Register to Requiem.tv</h2>
      {error !== null && <div className='bg-slate-700 block rounded mb-6 text-sm border-4 p-2 text-neutral-200 border-red-600 text-semibold'><CircleX className='text-red-600 inline mx-1'/>{error}</div>}
      <form onSubmit={RegisterApi}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-100 mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="mt-1 block bg-slate-900 text-neutral-200 border-neutral-600 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 focus:border-2  sm:text-sm"
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-100 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="mt-1 block bg-slate-900 text-neutral-200 border-neutral-600 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 focus:border-2  sm:text-sm"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-medium text-neutral-100 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="mt-1 block bg-slate-900 text-neutral-200 border-neutral-600 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 focus:border-2  sm:text-sm"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button disabled={isLoading || isEmptyLabels}
            type="submit"
            className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-rose-950 disabled:text-neutral-400"
            + (!isLoading ? " bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" : " bg-rose-950")}
          >
            {isLoading ? "Loading" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;