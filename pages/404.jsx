import Link from 'next/link';
import MetaHead from '@/components/shared/meta-head';
import Button from '@/components/shared/button';

function NotFound() {
  return (
    <>
      <MetaHead
        title="404 Page Not Found"
        description="404 Page Not Found"
        index="noindex"
      />
      <h1>404 Page Not Found</h1>
      <Link href="/">
        <Button type="button" className="btn btn-primary btn-sm">
          Back Home &raquo;
        </Button>
      </Link>
    </>
  );
}

export default NotFound;
