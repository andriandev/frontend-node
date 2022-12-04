import MetaHead from '@/components/shared/meta-head';
import { siteTitle, siteSeparator } from '@/config/setting';
import Card from '@/components/shared/card';
import Button from '@/components/shared/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const dataInput = {
      email, // email: email
      password, // password: password
    };

    const toastLoading = toast.loading('Please wait...');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataInput),
    })
      .then((response) => response.json())
      .then((result) => handleResponse(result))
      .catch((e) => handleError(e));

    function handleResponse(result) {
      if (result.status == '200') {
        toast.update(toastLoading, {
          render: 'Login success, redirect in 3 second',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });

        // Save token to localStorage
        localStorage.setItem('token', result?.data?.token);

        // Redirect to /users
        setTimeout(() => {
          window.location.href = '/users';
        }, 3000);
      } else {
        toast.update(toastLoading, {
          render: result?.data,
          type: 'error',
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }

    function handleError(e) {
      toast.update(toastLoading, {
        render: e?.message,
        type: 'error',
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <MetaHead
        title={`Login ${siteSeparator()} ${siteTitle()}`}
        description="Login"
        canonical="/login"
      />
      <h1>Login</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="username@gmail.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="******"
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <p className="alert alert-primary text-center my-3" role="alert">
          Harap login terlebih dahulu untuk dapat melihat data user dan membuat
          user baru.
        </p>
      </Card>
      <ToastContainer />
    </>
  );
}

export default Login;
