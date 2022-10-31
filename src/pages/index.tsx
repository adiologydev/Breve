import { useState } from 'react';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import type { ShortAPIResponse } from '@/types/ShortAPI';

interface PostProps {
  url: string;
  customAlias?: string;
}

const Index = () => {
  const [url, setURL] = useState('');
  const [shortUrl, setShortURL] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const props: PostProps = {
      url,
      customAlias: alias,
    };
    if (alias.length < 1) delete props.customAlias;

    const fetchApi: ShortAPIResponse = await fetch(`/api/short`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    }).then((d) => d.json());

    if (fetchApi.error) return setError(fetchApi.error);

    setShortURL(`${process.env.HOST}/${fetchApi.data.alias}`);
    setError('');
    setURL('');
    setAlias('');

    return true;
  };

  return (
    <Main
      meta={
        <Meta
          title={'Breve'}
          description={'Breve. A Simple Link Shortening Service.'}
        />
      }
    >
      <div className="h-screen flex flex-col justify-center items-center align-middle gap-6">
        <h1 className="text-3xl font-bold">Breve</h1>
        <div className="flex shadow-xl xl:w-1/4 border-2 border-zinc-400">
          <input
            type="url"
            placeholder="Paste a link to shorten"
            className="p-4 w-3/4"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
          <input
            placeholder="Alias (Optional)"
            className="p-4 w-1/3"
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
        </div>
        <button
          className="py-4 px-8 shadow-xl hover:shadow-2xl bg-orange-300 hover:scale-105"
          onClick={handleSubmit}
        >
          Shorten
        </button>
        {shortUrl ? (
          <p className="font-bold">
            Hurray! Here&#39;s your short link!{' '}
            <a href={`https://${shortUrl}`}>{shortUrl}</a>
          </p>
        ) : null}
        {error ? <p className="font-bold">Oops! {error}</p> : null}
      </div>
    </Main>
  );
};

export default Index;
