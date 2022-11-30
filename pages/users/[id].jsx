import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MetaHead from '@/components/shared/meta-head';
import { siteTitle, siteSeparator } from '@/config/setting';
import Card from '@/components/shared/card';

function UserDetail() {
  const [name, setName] = useState('Loading...');
  const [email, setEmail] = useState('Loading...');
  const [role, setRole] = useState('Loading...');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${router?.query?.id}`)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == 200) {
            setName(result?.data?.name);
            setEmail(result?.data?.email);
            setRole(result?.data?.role);
          } else {
            setName(null);
            setEmail(null);
            setRole(null);
            // router.push('/404')
            console.log(result?.data);
          }
        })
        .catch((e) => console.log(e?.message));
    }
  }, [router.isReady]);

  return (
    <>
      <MetaHead
        title={`Detail User ${siteSeparator()} ${siteTitle()}`}
        description="Detail User"
        canonical="/users/id"
      />
      <h1>Detail User</h1>
      <Card>
        {name == null ? (
          '404 User Not Found'
        ) : (
          <ul>
            <li>Name: {name}</li> <li>Email: {email}</li> <li>Role: {role}</li>
          </ul>
        )}
      </Card>
    </>
  );
}

export default UserDetail;
