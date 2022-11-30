import MetaHead from '@/components/shared/meta-head';
import {
  siteTitle,
  siteDescription,
  siteSubTitle,
  siteSeparator,
} from '@/config/setting';

function Home() {
  return (
    <>
      <MetaHead
        title={`${siteTitle()} ${siteSeparator()} ${siteSubTitle()}`}
        description={siteDescription()}
        canonical="/"
      />
      <h1>Home</h1>
    </>
  );
}

export default Home;
