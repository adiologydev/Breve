import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={'Breve'}
          description={'Bereve. A Simple Link Shortening Service.'}
        />
      }
    >
      init
    </Main>
  );
};

export default Index;
