'use client';

import { SendHorizonal, MoreVertical } from 'lucide-react';
import { useState } from 'react';

import { MOCK_SQUAD, MOCK_SQUAD_COMMENTS } from '@/entities/squad';
import { Avatar } from '@/shared/ui/Avatar';
import Link from 'next/link';

interface SquadDetailProps {
  id: string;
}

export const SquadDetail = ({ id }: SquadDetailProps) => {
  const squad = MOCK_SQUAD;
  const comments = MOCK_SQUAD_COMMENTS;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3 bg-grayscale100 pt-16 pb-6 min-h-screen">
      {/* 스쿼드 상세 카드 */}
      <div className="flex flex-col gap-2 bg-white px-4 py-3 rounded-lg mx-0">
        {/* 제목 */}
        <div className="flex items-center py-2">
          <h2 className="flex-1 text-500 font-bold leading-130 text-grayscale900">{squad.title}</h2>
        </div>

        {/* 지역 + 카테고리 */}
        <div className="flex items-center gap-3 py-1">
          <span className="text-100 font-medium leading-130 text-grayscale900">지역</span>
          <div className="flex items-center gap-1">
            {squad.location && (
              <span className="rounded-lg bg-primary700 px-2 py-1 text-100 font-bold text-white leading-130">
                {squad.location}
              </span>
            )}
            {squad.locationDetail && (
              <span className="rounded-lg bg-primary700 px-2 py-1 text-100 font-bold text-white leading-130">
                {squad.locationDetail}
              </span>
            )}
          </div>
        </div>

        {/* 작성자 + 내용 */}
        <div className="flex flex-col gap-2 pb-9 pt-2">
          <div className="flex items-center gap-1">
            <Avatar className="size-4" imageUrl={squad.authorProfileImageUrl} />
            <span className="text-200 font-medium leading-130 text-grayscale900 tracking-[-0.28px]">
              {squad.authorNickname}
            </span>
          </div>
          <div
            className={`text-300 font-medium leading-130 text-grayscale900 whitespace-pre-wrap [word-break:break-word] ${
              !expanded ? 'line-clamp-6' : ''
            }`}
          >
            {squad.content}
          </div>
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-center text-300 font-regular leading-130 text-grayscale900 tracking-[-0.32px]"
            >
              더보기
            </button>
          )}
        </div>

        {/* 카테고리 + 모집정원 */}
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <span className="rounded-lg bg-primary900 px-2 py-1 text-100 font-bold text-white leading-130">
              {squad.category}
            </span>
          </div>
          <span className="text-300 font-regular leading-130 text-grayscale900 tracking-[-0.32px] whitespace-nowrap">
            모집정원 {squad.maxMembers} 명
          </span>
        </div>

        {/* 스쿼드챗 바로가기 */}
        <Link
          href={squad.openChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center rounded-lg bg-primary500 p-3"
          aria-label="스쿼드챗 바로가기"
        >
          <span className="text-300 font-medium leading-130 text-white tracking-[-0.32px]">스쿼드챗 바로가기</span>
        </Link>
      </div>

      {/* 댓글 섹션 */}
      <div className="flex flex-col gap-4 bg-white px-4 py-3 rounded-lg mx-0">
        <h3 className="h-7 text-500 font-bold leading-130 text-grayscale900">댓글</h3>

        {/* 댓글 입력창 */}
        <div className="flex items-center gap-2 rounded-lg bg-grayscale100 px-3 py-2 h-10">
          <p className="flex-1 text-200 leading-130 text-grayscale500">댓글을 입력해 보세요</p>
          <button type="button" aria-label="댓글 전송">
            <SendHorizonal size={24} className="text-grayscale400" />
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Avatar className="size-4" imageUrl={comment.authorProfileImageUrl} />
                  <span className="text-100 font-bold leading-130 text-grayscale900">
                    {comment.authorNickname}
                  </span>
                </div>
                <button type="button" aria-label="댓글 옵션" className="opacity-25">
                  <MoreVertical size={24} className="text-grayscale900" />
                </button>
              </div>
              <p className="w-full text-300 font-regular leading-130 text-grayscale900 tracking-[-0.32px] [word-break:break-word] whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
