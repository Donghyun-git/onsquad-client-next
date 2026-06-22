'use client';

import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
}

export const CommentInput = ({ placeholder = '댓글을 입력해 보세요', onSubmit }: CommentInputProps) => {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setValue('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-grayscale100 px-3 py-2 h-10">
      <input
        className="min-w-0 flex-1 bg-transparent text-200 leading-130 text-grayscale900 placeholder:text-grayscale500 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void handleSubmit();
          }
        }}
      />
      <button
        type="button"
        className="shrink-0"
        aria-label="전송"
        disabled={!value.trim() || submitting}
        onClick={() => void handleSubmit()}
      >
        <SendHorizonal
          size={24}
          className={value.trim() ? 'text-primary500' : 'text-grayscale400'}
        />
      </button>
    </div>
  );
};
