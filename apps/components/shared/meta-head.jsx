import Head from 'next/head';
import {
  siteBaseUrl,
  siteFaviconUrl,
  siteTitle,
  siteDescription,
  siteIndex,
} from '@/config/setting';

function MetaHead(props) {
  // Define variabel
  const baseUrl = siteBaseUrl();
  const faviconUrl = siteFaviconUrl();
  const faviconType = faviconUrl.split('.');

  const index =
    props.index == 'noindex' ? 'noindex, nofollow' : 'index, follow';
  const canonical = props.canonical || false;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="robots" content={index} />
      {canonical && <link rel="canonical" href={baseUrl + canonical} />}
      <link
        rel="icon"
        type={`image/${faviconType[faviconType.length - 1]}`}
        href={faviconUrl.includes('http') ? faviconUrl : baseUrl + faviconUrl}
      />
    </Head>
  );
}

MetaHead.defaultProps = {
  title: siteTitle(),
  description: siteDescription(),
  index: siteIndex(),
};

export default MetaHead;
