'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';

import { memberQueries, type MySquadRequestItem } from '@/entities/member';
import { squadRequestCancelFetch } from '@/entities/squad/api';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { useApiMutation } from '@/shared/lib/queries';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/Button';

import SquadApplicationCard from './SquadApplicationCard';

type TabType = 'crew' | 'squad';

const TAB_BUTTON_BASE_CLASS =
  'flex flex-1 items-center justify-center rounded py-2 text-300 font-medium leading-130 text-center tracking-[-0.32px]';

const SquadJoin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('squad');

  const { data } = useQuery(memberQueries.mySquadRequests());
  const requests = data?.data.results ?? [];

  const cancelMutation = useApiMutation({
    fetcher: squadRequestCancelFetch,
    invalidateKey: memberQueries.root(),
  });

  const handleCancel = (item: MySquadRequestItem) =>
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title="합류 신청을 취소할까요?"
          buttonSlot={
            <div className="grid grid-cols-2">
              <Button className={BUTTON.CANCEL} onClick={handleClose}>
                닫기
              </Button>
              <Button
                className={BUTTON.ACTION}
                onClick={async () => {
                  handleClose();
                  await cancelMutation.mutateAsync({ squadId: item.squad.id });
                }}
              >
                신청 취소
              </Button>
            </div>
          }
        >
          {item.squad.title} 스쿼드 합류 신청을 취소합니다.
        </Alert>
      );
    });

  return (
    <div className="flex flex-col gap-4 bg-grayscale50 min-h-screen py-6">
      {/* 탭 */}
      <div className="flex items-center px-4">
        <button
          type="button"
          onClick={() => setActiveTab('crew')}
          className={`${TAB_BUTTON_BASE_CLASS} ${
            activeTab === 'crew' ? 'bg-primary500 text-white' : 'text-grayscale500'
          }`}
          aria-selected={activeTab === 'crew'}
          role="tab"
        >
          크루 합류신청
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('squad')}
          className={`${TAB_BUTTON_BASE_CLASS} ${
            activeTab === 'squad' ? 'bg-primary500 text-white' : 'text-grayscale500'
          }`}
          aria-selected={activeTab === 'squad'}
          role="tab"
        >
          스쿼드 합류신청
        </button>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-3 px-4">
        {activeTab === 'squad' &&
          (requests.length > 0
            ? requests.map((item) => (
                <SquadApplicationCard key={item.id} application={item} onCancel={() => handleCancel(item)} />
              ))
            : <p className="py-10 text-center text-300 text-grayscale500">스쿼드 합류신청 내역이 없습니다.</p>)}
        {activeTab === 'crew' && (
          <p className="py-10 text-center text-300 text-grayscale500">크루 합류신청 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SquadJoin;
