import type { Profile } from '@generated/types';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import getAvatar from '@lib/getAvatar';
import isVerified from '@lib/isVerified';
import type { Message } from '@xmtp/xmtp-js';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';

dayjs.extend(relativeTime);

interface Props {
  profile: Profile;
  message: Message;
}

const Preview: FC<Props> = ({ profile, message }) => {
  const router = useRouter();

  const onConversationSelected = (profileId: string) => {
    router.push(profileId ? `/messages/${profileId}` : '/messages');
  };

  return (
    <div className="hover:bg-gray-100 py-3 cursor-pointer" onClick={() => onConversationSelected(profile.id)}>
      <div className="flex justify-between space-x-1.5 px-5">
        <div className="flex items-center space-x-3">
          <img
            src={getAvatar(profile)}
            loading="lazy"
            className="w-10 h-10 bg-gray-200 rounded-full border dark:border-gray-700/80"
            height={40}
            width={40}
            alt={profile?.handle}
          />
          <div>
            <div className="flex gap-1 items-center max-w-sm truncate">
              <div className={clsx('text-md')}>{profile?.name ?? profile.handle}</div>
              {isVerified(profile?.id) && <BadgeCheckIcon className="w-4 h-4 text-brand" />}
            </div>
            <span className="text-sm text-gray-500 line-clamp-1">{message.content}</span>
          </div>
        </div>
        {message.sent && (
          <span className="min-w-fit text-xs text-gray-500">{dayjs(new Date(message.sent)).fromNow()}</span>
        )}
      </div>
    </div>
  );
};

export default Preview;
