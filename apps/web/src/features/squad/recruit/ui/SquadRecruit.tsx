import { Pencil } from 'lucide-react';

import { MOCK_SQUAD_NOTICES } from '@/entities/squad';

import SquadNoticeCard from './SquadNoticeCard';

const SquadRecruit = () => {
  return (
    <div className="flex flex-col gap-3 bg-grayscale50 min-h-screen pt-3">
      {/* 공지사항 섹션 */}
      <div className="mx-0 rounded-xl bg-white px-5 py-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-500 font-bold leading-130 text-grayscale900">공지사항</h2>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full border border-primary500 px-2 py-1"
            aria-label="공지 글쓰기"
          >
            <Pencil size={14} className="text-primary500" />
            <span className="text-100 font-bold text-primary500 leading-130">글쓰기</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_SQUAD_NOTICES.map((notice, idx) => (
            <SquadNoticeCard
              key={notice.id}
              notice={notice}
              showDivider={idx < MOCK_SQUAD_NOTICES.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquadRecruit;
