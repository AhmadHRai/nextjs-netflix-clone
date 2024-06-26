import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import userImg from '@/public/avatar.png';
import { FolderSync, HelpCircle, Pencil, UserRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '../../utils/auth';
import UserSignOutButton from '../UserSignOutButton';

export default async function UserButton() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const avatarSrc = session.user?.image || userImg;
  const userShortName = session.user?.name?.slice(0, 2) || 'AR';
  const userName = session.user?.name;
  const userMail = session.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-sm'>
          <Avatar className='h-8 w-8 rounded-sm' rel='preload'>
            <AvatarImage
              src={avatarSrc}
              alt='Profile picture'
              fetchPriority='high'
              loading='eager'
            />
            <AvatarFallback className='rounded-sm uppercase' delayMs={0}>
              {userShortName}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-56 text-start rounded-none mt-4 bg-black/90'
        align='end'
        forceMount
      >
        <DropdownMenuLabel>
          <div className='flex flex-row'>
            <Image
              src={userImg} /* change this to the avatar */
              alt='user random image'
              className='rounded-sm w-7 h-7 hover:cursor-pointer'
            />
            <div className='flex flex-col space-y-2 ps-2'>
              <p className='text-sm font-medium leading-none hover:underline hover:cursor-pointer'>
                {userName}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>{userMail}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex items-center hover:underline hover:cursor-pointer'>
            <Pencil className='ms-0 opacity-100 w-6 h-6  text-zinc-400' />
            <span className='ps-2'>Manage Profiles</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center hover:underline hover:cursor-pointer'>
            <FolderSync className='ms-0 opacity-100 w-6 h-6  text-zinc-400' />
            <span className='ps-2'>Transfer Profiles</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center hover:underline hover:cursor-pointer'>
            <UserRound className='ms-0 opacity-100 w-6 h-6  text-zinc-400' />
            <span className='ps-2'>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center hover:underline hover:cursor-pointer'>
            <HelpCircle className='ms-0 opacity-100 w-6 h-6  text-zinc-400' />
            <span className='ps-2'>Help Center</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <UserSignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
