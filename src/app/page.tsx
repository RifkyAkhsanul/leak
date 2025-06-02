//import dynamic from 'next/dynamic';
import RootLayout from './layout';
import ClientHome from './home/page';

export default function Page() {
  return (
    <RootLayout>
      <ClientHome />
    </RootLayout>
  );
}
