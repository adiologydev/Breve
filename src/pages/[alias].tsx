import { NextPage } from 'next';

import { ShortAPIResponse } from '@/types/ShortAPI';

const Alias: NextPage<AliasProps> = ({ error }) => {
  if (error) return <div>{error}</div>;
  return <div>Loading...</div>;
};

Alias.getInitialProps = async ({ res, query }) => {
  const { alias } = query;
  const fetchApi: ShortAPIResponse = await fetch(
    `${process.env.HOST}/api/short?alias=${alias}`
  ).then((d) => d.json());

  if (fetchApi.error) return { error: fetchApi.error };

  if (typeof window === 'undefined') {
    res!.writeHead(301, {
      location: fetchApi.data.url,
    });
    res!.end();
  }
  window.location.replace(fetchApi.data.url);
  return {};
};

export default Alias;

interface AliasProps {
  error?: string;
}
