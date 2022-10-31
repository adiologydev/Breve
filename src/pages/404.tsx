import Link from 'next/link';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

import BackIcon from './componenets/Icons/BackIcon';

const NotFound = () => {
  return (
    <Main
      meta={
        <Meta
          title={'Breve - Page Not Found'}
          description={'Breve. A Simple Link Shortening Service.'}
        />
      }
    >
      <div className="h-screen flex flex-col justify-center items-center align-middle gap-6">
        <h1 className="text-3xl font-bold">Breve</h1>
        <p>Page Not Found</p>
        <Link
          href={'/'}
          className={'hover:underline text-blue-600 flex items-center gap-1'}
        >
          <BackIcon />
          Go Back
        </Link>
      </div>
    </Main>
  );
};

export default NotFound;
