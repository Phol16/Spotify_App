import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex w-full min-h-screen'>
      <section className='flex-[1.2] lg:flex-[1.5] pb-2 px-2 hidden md:block'>
        <Sidebar />
      </section>
      <section className='flex-[5] overflow-y-auto pb-2 mt-4 px-2'>
        <div className='bg-zinc-700 bg-opacity-20 rounded-lg h-full overflow-hidden overflow-y-auto'>
          <Header>Header</Header>
          {children}
        </div>
      </section>
    </main>
  );
}
