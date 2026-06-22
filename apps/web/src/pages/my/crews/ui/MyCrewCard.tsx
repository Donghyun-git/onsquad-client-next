'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, Zap } from 'lucide-react';

import type { MyCrewParticipantItem } from '@/entities/member';
import { Text } from '@/shared/ui/Text';

interface MyCrewCardProps {
  item: MyCrewParticipantItem;
}

const MyCrewCard = ({ item }: MyCrewCardProps) => {
  const router = useRouter();
  const { crew, states } = item;

  return (
    <button
      type="button"
      onClick={() => router.push(`/crews/${crew.id}`)}
      aria-label={`${crew.name} 크루로 이동`}
      className="relative flex h-40 w-full items-end overflow-hidden rounded-2xl text-left transition-all duration-200 hover:shadow-md"
    >
      <Image
        src={crew.imageUrl || '/images/mock1.png'}
        alt={crew.name}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      {states.isOwner && (
        <span className="absolute left-s-20 top-s-20 flex items-center gap-s-10 rounded-full bg-primary500 px-s-20 py-s-10 text-200 font-semibold text-white">
          <Zap className="h-3.5 w-3.5" /> 내 크루
        </span>
      )}
      <div className="relative flex w-full items-center justify-between px-s-20 py-s-30">
        <Text.xl className="font-bold text-white leading-tight">{crew.name}</Text.xl>
        <ChevronRight className="h-5 w-5 shrink-0 text-white" />
      </div>
    </button>
  );
};

export default MyCrewCard;
