import Logo from '@/public/netflix_logo.svg';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NavLink from './NavLink';
import ScrollContainer from './ScrollContainer';
import UserNav from './UserNav';

interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: 'Home', href: '/home' },
  { name: 'Tv Shows', href: '/home/shows' },
  { name: 'Movies', href: '/home/movies' },
  { name: 'Recently Added', href: '/home/recently' },
  { name: 'My List', href: '/home/user/list' },
];

export default function Navbar() {
  return (
    <ScrollContainer>
      <div className='flex w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8'>
        <div className='flex items-center gap-2'>
          <Link href='/home' className='w-32'>
            <Image src={Logo} alt='Netflix logo' priority />
          </Link>
          <ul className='md:flex gap-x-5 hidden'>
            {links.map((link, idx) => (
              <NavLink key={idx} path={link.href} label={link.name} />
            ))}
          </ul>
        </div>

        <div className='flex items-center lg:space-x-5 space-x-0 pr-5 sm:pr-10'>
          <Search className='hidden lg:flex w-5 h-5 text-gray-300 cursor-pointer' />
          <div className='hidden lg:flex cursor-pointer'>Kids</div>
          <Bell className='hidden lg:flex h-5 w-5 text-gray-300 cursor-pointer' />
          <UserNav />
        </div>
      </div>
    </ScrollContainer>
  );
}
