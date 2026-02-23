'use client';

import { useEffect, useRef, useState } from 'react';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { githubLight } from '@uiw/codemirror-theme-github';
import dayjs from 'dayjs';
import { Image as ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';

import { CREW_PATH } from '@/shared/config/paths';
import { useUserStore } from '@/shared/lib/store/useUserStore';
import { supabase } from '@/shared/lib/supabse/createClient';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

type EditorTab = 'write' | 'preview';

const TextEditor = ({ value = '', onChange, placeholder }: TextEditorProps) => {
  const user = useUserStore((state) => state.user);

  const [content, setContent] = useState<string>(value);
  const [activeTab, setActiveTab] = useState<EditorTab>('write');
  const [editorHeight, setEditorHeight] = useState<number>(300);

  const editorContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (val: string) => {
    setContent(val);

    onChange?.(val);
  };

  const insertText = (before: string, after: string = '') => {
    const newContent = content + before + after;

    setContent(newContent);

    onChange?.(newContent);
  };

  const insertHeading = (level: number) => {
    const heading = '#'.repeat(level) + ' ';

    insertText('\n' + heading);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const userEmail = user?.user?.email || 'unknown';

    const fileName = `${dayjs().unix()}_${userEmail}_${CREW_PATH.announce}`;

    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    const { data: urlData } = supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!).getPublicUrl(data.path);

    const imageUrl = urlData.publicUrl;

    insertText(`\n![이미지](${imageUrl})\n`);
  };

  useEffect(() => {
    const layoutElement = editorContainerRef.current;

    const calculateHeight = () => {
      if (!editorContainerRef.current) return;

      const height = editorContainerRef.current.clientHeight - 51;

      setEditorHeight(height);
    };

    const observer = new ResizeObserver(calculateHeight);

    observer.observe(layoutElement as HTMLElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => setActiveTab('write')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'write' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          작성하기
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'preview' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          미리보기
        </button>
      </div>

      <div ref={editorContainerRef} className="grow overflow-hidden rounded-b-lg border border-gray-200">
        {activeTab === 'write' ? (
          <div>
            <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-2">
              <button
                type="button"
                onClick={() => insertHeading(1)}
                className="rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => insertHeading(2)}
                className="rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertHeading(3)}
                className="rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertHeading(4)}
                className="rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                H4
              </button>
              <div className="mx-2 h-6 w-px bg-gray-300" />
              <label className="cursor-pointer rounded p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <ImageIcon size={20} />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <CodeMirror
              value={content}
              height={`${editorHeight}px`}
              placeholder={placeholder || '마크다운으로 작성해보세요...\n\n# 제목\n\n내용을 입력하세요'}
              extensions={[
                markdown({
                  base: markdownLanguage,
                  codeLanguages: languages,
                }),
                EditorView.lineWrapping,
              ]}
              theme={githubLight}
              onChange={handleChange}
              className="text-base"
              basicSetup={{
                lineNumbers: false,
                foldGutter: true,
                highlightActiveLine: true,
                highlightActiveLineGutter: false,
              }}
            />
          </div>
        ) : (
          <div
            style={{ height: `${editorHeight + 49}px` }}
            className="prose prose-slate max-w-none overflow-y-auto bg-white p-6"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || '*미리볼 내용이 없습니다.*'}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <details className="cursor-pointer">
          <summary className="hover:text-gray-700">마크다운 문법 도움말</summary>
          <div className="mt-2 space-y-1 pl-4">
            <p># 제목 (H1) ~ ###### 제목 (H6)</p>
            <p>**굵게** or __굵게__</p>
            <p>*기울임* or _기울임_</p>
            <p>`코드`</p>
            <p>```언어명 (코드 블록)</p>
            <p>[링크텍스트](URL)</p>
            <p>![이미지설명](이미지URL)</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default TextEditor;
