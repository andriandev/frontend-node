import { useEffect, useState } from 'react';
import Link from 'next/link';
import MetaHead from '@/components/shared/meta-head';
import { siteTitle, siteSeparator } from '@/config/setting';
import Card from '@/components/shared/card';
import Button from '@/components/shared/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  const [dataUser, setDataUser] = useState([]);

  function fetchData() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then((response) => response.json())
      .then((result) => {
        if (result?.status == 200) {
          setDataUser(result?.data);
        } else {
          console.log(result?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm('Delete user ?')) {
      const toastLoading = toast.loading('Please wait...');

      // Get token from localStorage
      const token = localStorage.getItem('token');

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
          // Load data
          fetchData();
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
    }
  };

  return (
    <>
      <MetaHead
        title={`List Users ${siteSeparator()} ${siteTitle()}`}
        description="List Users"
        canonical="/users"
      />
      <h1>List User</h1>
      <Card>
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                  <td>
                    <Link href={`/users/${item.id}`}>
                      <a className="btn btn-primary btn-sm me-1">Detail</a>
                    </Link>
                    <Button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <ToastContainer />
    </>
  );
}

export default Users;
