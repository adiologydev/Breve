import { GetServerSidePropsContext, NextPage } from 'next';

import { ShortAPIResponse } from '@/types/ShortAPI';

const Alias: NextPage<AliasProps> = ({ error }) => {
  if (error) return <div>{error}</div>;
  return <div>Loading...</div>;
};

export default Alias;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const alias = context.query?.alias;
  const fetchApi: ShortAPIResponse = await fetch(
    `http://${process.env.HOST}/api/short?alias=${alias}`
  ).then((d) => d.json());

  if (fetchApi.error)
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        error: fetchApi.error,
      },
    };

  return {
    redirect: {
      permanent: true,
      destination: fetchApi.data.url,
    },
    props: {},
  };
}

interface AliasProps {
  error?: string;
}
