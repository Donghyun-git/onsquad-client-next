'use client';

import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { overlay } from 'overlay-kit';

import type { SquadCommentItem } from '@/entities/squad/types/squad.types';
import {
  squadCommentUpdateFetch,
  squadCommentDeleteFetch,
  squadReplyCreateFetch,
} from '@/entities/squad/api';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { OVERLAY_ANIMATION_DURATION } from '@/shared/config';
import { useApiMutation } from '@/shared/lib/queries';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Avatar } from '@/shared/ui/Avatar';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/ui/button';
import { squadQueries } from '@/entities/squad/api/squad.queries';

import { CommentInput } from './CommentInput';

interface CommentItemProps {
  squadId: number;
  comment: SquadCommentItem;
  /** 대댓글 여부 (true면 답글 입력창/replies 렌더 생략) */
  isReply?: boolean;
}

export const CommentItem = ({ squadId, comment, isReply = false }: CommentItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const invalidateKey = [...squadQueries.root(), 'comments', squadId];

  const updateMutation = useApiMutation({
    fetcher: squadCommentUpdateFetch,
    invalidateKey,
  });

  const deleteMutation = useApiMutation({
    fetcher: squadCommentDeleteFetch,
    invalidateKey,
  });

  const replyMutation = useApiMutation({
    fetcher: squadReplyCreateFetch,
    invalidateKey,
  });

  if (comment.deleted) {
    return (
      <div className="flex flex-col gap-1 p-2">
        <p className="text-200 leading-130 text-grayscale400">삭제된 댓글입니다.</p>
        {/* 대댓글이 있으면 삭제된 댓글 아래도 표시 */}
        {!isReply && comment.replies.length > 0 && (
          <div className="flex flex-col gap-2 pl-6 mt-1">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} squadId={squadId} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    );
  }

  const handleOpenMenu = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <BottomSheet title="댓글 관리" isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                handleClose();
                setEditValue(comment.content);
                setEditMode(true);
              }}
            >
              수정
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  overlay.open(({ isOpen: alertOpen, close: alertClose, unmount: alertUnmount }) => {
                    const handleAlertClose = () => closeWithAnimation(alertClose, alertUnmount);
                    return (
                      <Alert
                        isOpen={alertOpen}
                        title="댓글을 삭제할까요?"
                        buttonSlot={
                          <div className="grid grid-cols-2">
                            <Button className={BUTTON.CANCEL} onClick={handleAlertClose}>
                              취소
                            </Button>
                            <Button
                              className={BUTTON.ACTION}
                              onClick={async () => {
                                handleAlertClose();
                                await deleteMutation.mutateAsync({ squadId, commentId: comment.id });
                              }}
                            >
                              삭제
                            </Button>
                          </div>
                        }
                      >
                        댓글을 삭제합니다.
                      </Alert>
                    );
                  });
                }, OVERLAY_ANIMATION_DURATION);
              }}
            >
              삭제
            </Button>
          </div>
        </BottomSheet>
      );
    });
  };

  const handleUpdate = async () => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    await updateMutation.mutateAsync({ squadId, commentId: comment.id, content: trimmed });
    setEditMode(false);
  };

  const handleReplySubmit = async (content: string) => {
    await replyMutation.mutateAsync({ squadId, parentId: comment.id, content });
    setShowReplyInput(false);
  };

  return (
    <div className="flex flex-col gap-1 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="size-4" />
          <span className="text-100 font-bold leading-130 text-grayscale900">
            {comment.writer?.nickname}
          </span>
        </div>
        {comment.states.canDelete && (
          <button type="button" aria-label="댓글 옵션" onClick={handleOpenMenu}>
            <MoreVertical size={24} className="text-grayscale900" />
          </button>
        )}
      </div>

      {editMode ? (
        <div className="flex w-full items-center gap-2 rounded-lg bg-grayscale100 px-3 py-2">
          <input
            className="min-w-0 flex-1 bg-transparent text-200 leading-130 text-grayscale900 outline-none"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleUpdate();
              }
              if (e.key === 'Escape') {
                setEditMode(false);
              }
            }}
            autoFocus
          />
          <Button
            variant="ghost"
            className="h-auto shrink-0 p-0 text-100 text-primary500"
            onClick={() => void handleUpdate()}
          >
            완료
          </Button>
          <Button
            variant="ghost"
            className="h-auto shrink-0 p-0 text-100 text-grayscale500"
            onClick={() => setEditMode(false)}
          >
            취소
          </Button>
        </div>
      ) : (
        <p className="w-full text-300 font-regular leading-130 text-grayscale900 tracking-[-0.32px] [word-break:break-word] whitespace-pre-wrap">
          {comment.content}
        </p>
      )}

      {/* 답글 버튼 (최상위 댓글에만, 편집 모드 아닐 때) */}
      {!isReply && !editMode && (
        <button
          type="button"
          className="self-start text-100 font-medium leading-130 text-grayscale500 mt-0.5"
          onClick={() => setShowReplyInput((prev) => !prev)}
        >
          답글
        </button>
      )}

      {/* 대댓글 목록 */}
      {!isReply && comment.replies.length > 0 && (
        <div className="flex flex-col gap-2 pl-6 mt-1">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} squadId={squadId} comment={reply} isReply />
          ))}
        </div>
      )}

      {/* 답글 입력창 */}
      {!isReply && showReplyInput && (
        <div className="pl-6 mt-1">
          <CommentInput placeholder="답글을 입력해 보세요" onSubmit={handleReplySubmit} />
        </div>
      )}
    </div>
  );
};
