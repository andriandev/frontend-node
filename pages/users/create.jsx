import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MetaHead from '@/components/shared/meta-head';
import { siteTitle, siteSeparator } from '@/config/setting';
import Card from '@/components/shared/card';
import Button from '@/components/shared/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserCreate() {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // Get token from localStorage
      const tokenLocal = localStorage.getItem('token');
      if (!tokenLocal) {
        router.push('/login');
      }

      if (tokenLocal) {
        setToken(tokenLocal);
      }
    }
  }, [router.isReady]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataInput = {
      name: e.target[0].value,
      email: e.target[1].value,
      role: e.target[2].value,
      password: e.target[3].value,
    };

    const toastLoading = toast.loading('Please wait...');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataInput),
    })
      .then((response) => response.json())
      .then((result) => handleResponse(result))
      .catch((e) => handleError(e));

    function handleResponse(result) {
      if (result.status == 200) {
        toast.update(toastLoading, {
          render: result?.data,
          type: 'success',
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
        // Reset form input
        e.target.reset();
      } else {
        toast.update(toastLoading, {
          render: result?.data,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
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
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <MetaHead
        title={`Create User ${siteSeparator()} ${siteTitle()}`}
        description="Create User"
        canonical="/users/create"
      />
      <h1>Create User</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Andrian"
              required
            />
          </div>
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
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select className="form-select" defaultValue="user">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
      </Card>
      <ToastContainer />
    </>
  );
}

export default UserCreate;
