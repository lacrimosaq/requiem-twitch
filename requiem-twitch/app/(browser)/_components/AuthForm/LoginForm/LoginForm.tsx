
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation'
import { CircleX } from 'lucide-react';
const LoginForm = ({stateChanger, ...rest}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string| null>(null);
    const [isLoading, startLoading] = useState(false);
    const router = useRouter();
    const isEmptyLabels = username.length === 0 || password.length === 0;

    // const onSubmit = (e) => {
    //   startTransition(() =>{
    //     LoginApi(e);
    //   });
    // }
    //     router.push('/dashboard')
    const LoginApi =  (e) => {
          e.preventDefault();
          startLoading(true);
          let status = 0;
          let loginobj = {
              "username" : username,
              "password" : password, 
          };
          console.log(loginobj);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          fetch("http://localhost:8080/auth/login", {
              method: "POST",
              headers: headers,
              body: JSON.stringify(loginobj)
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
              console.log("Token from login" + localStorage.getItem("jwtToken"));
              // if(status == 200) window.location.reload(); 
              location.reload();
          }).catch((err) => {
              console.log('Failed :' + err.message);
              setError('Failed :' + err.message);
          }).finally(() =>{
            startLoading(false);
          });
        
    }
    

  return (
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-black text-neutral-100">Login to Requiem.tv</h2>
        {error !== null && <div className='bg-slate-700 block rounded mb-6 text-sm border-4 p-2 text-neutral-200 border-red-600 text-semibold'><CircleX className='text-red-600 inline mx-1'/>That password was incorrect.</div>}
        
        <form onSubmit={LoginApi}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-neutral-100">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block bg-slate-900 text-neutral-200 border-neutral-600 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 focus:border-2  sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-100">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block bg-slate-900 w-full text-neutral-200 border-neutral-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 focus:border-2 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <button disabled={isLoading || isEmptyLabels}
            type="submit"
            className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-rose-950 disabled:text-neutral-400"
            + (!isLoading ? " bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" : " bg-rose-950")}
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
  );
};

export default LoginForm;
