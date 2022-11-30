import MetaHead from '@/components/shared/meta-head';
import { siteTitle, siteSeparator } from '@/config/setting';

function UserDetail() {
  return (
    <>
      <MetaHead
        title={`Detail ${siteSeparator()} ${siteTitle()}`}
        description="Detail User"
        canonical="/users/id"
      />
      <h1>Detail User</h1>
    </>
  );
}

export default UserDetail;
