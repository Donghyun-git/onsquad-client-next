import Image from 'next/image';

import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';

import type { ApplicationItem } from './mock';

interface ApplicationCardProps {
  item: ApplicationItem;
  onCancel?: () => void;
  isCanceling?: boolean;
}

const STATUS_LABEL: Record<ApplicationItem['status'], string> = {
  progress: '수락 대기중',
  accepted: '합류 완료',
  rejected: '거절되었습니다.',
};

const ApplicationCard = ({ item, onCancel, isCanceling }: ApplicationCardProps) => {
  const isProgress = item.status === 'progress';
  const isRejected = item.status === 'rejected';

  return (
    <div className="overflow-hidden rounded-lg bg-white">
      {/* 이미지 영역 */}
      <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
        <Image src={item.imageUrl || '/images/mock1.png'} alt={item.targetName} fill className="object-cover" />
        <div className="bg-gradient-to-t absolute inset-0 flex items-end from-black/50 to-black/10 p-s-20">
          <Text.xl className="font-bold text-white">{item.targetName}</Text.xl>
        </div>
      </div>

      {/* 오너 정보 */}
      <div className="flex items-center gap-s-10 p-s-20">
        <Avatar className="h-6 w-6" />
        <Text.xs className="font-semibold text-grayscale900">{item.ownerName}</Text.xs>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-s-10 p-s-10">
        {isProgress ? (
          <>
            <button
              type="button"
              onClick={onCancel}
              disabled={isCanceling}
              className="flex flex-1 items-center justify-center rounded-md border border-grayscale500 bg-white py-s-20 disabled:opacity-50"
            >
              <Text.xs className="font-medium text-grayscale500">{isCanceling ? '취소 중...' : '취소하기'}</Text.xs>
            </button>
            <button type="button" className="flex flex-1 items-center justify-center rounded-md bg-primary700 py-s-20">
              <Text.xs className="font-medium text-primary50">수락 대기중</Text.xs>
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-1 items-center justify-center rounded-md bg-grayscale500 py-s-20">
              <Text.xs className="font-medium text-white">{STATUS_LABEL[item.status]}</Text.xs>
            </div>
            {isRejected && (
              <button type="button" className="flex items-center gap-s-10 px-s-10 py-s-20" aria-label="내역 삭제">
                <Text.xs className="text-grayscale700">내역 삭제</Text.xs>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
