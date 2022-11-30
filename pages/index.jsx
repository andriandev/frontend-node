import { useEffect, useState } from 'react';
import MetaHead from '@/components/shared/meta-head';
import {
  siteTitle,
  siteDescription,
  siteSubTitle,
  siteSeparator,
} from '@/config/setting';
import Card from '@/components/shared/card';

function Home() {
  const [name, setName] = useState('Tamu');
  const [email, setEmail] = useState('Tamu');
  const [role, setRole] = useState('Tamu');

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == 200) {
            setName(result?.data?.name);
            setEmail(result?.data?.email);
            setRole(result?.data?.role);
          } else {
            console.log(result?.data);
          }
        })
        .catch((e) => console.log(e?.message));
    }
  }, []);

  return (
    <>
      <MetaHead
        title={`${siteTitle()} ${siteSeparator()} ${siteSubTitle()}`}
        description={siteDescription()}
        canonical="/"
      />
      <h1>Home</h1>
      <Card>
        <ul>
          <li>Name: {name}</li> <li>Email: {email}</li> <li>Role: {role}</li>
        </ul>
        <p>Login untuk mengubah data di atas.</p>
      </Card>
    </>
  );
}

export default Home;
