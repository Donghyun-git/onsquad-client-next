'use client';

import { useQuery } from '@tanstack/react-query';

import { squadQueries } from '@/entities/squad/api/squad.queries';
import { squadCommentCreateFetch } from '@/entities/squad/api';
import { useApiMutation } from '@/shared/lib/queries';

import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';

interface CommentSectionProps {
  squadId: number;
}

export const CommentSection = ({ squadId }: CommentSectionProps) => {
  const { data } = useQuery(squadQueries.comments({ squadId }));
  const comments = data?.data.results ?? [];

  const createMutation = useApiMutation({
    fetcher: squadCommentCreateFetch,
    invalidateKey: [...squadQueries.root(), 'comments', squadId],
  });

  const handleCreate = async (content: string) => {
    await createMutation.mutateAsync({ squadId, content });
  };

  return (
    <div className="flex flex-col gap-4 bg-white px-4 py-3 rounded-lg mx-0">
      <h3 className="h-7 text-500 font-bold leading-130 text-grayscale900">댓글</h3>

      <CommentInput onSubmit={handleCreate} />

      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} squadId={squadId} comment={comment} />
        ))}
      </div>
    </div>
  );
};
