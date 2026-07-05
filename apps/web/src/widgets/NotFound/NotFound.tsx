import { PATH } from '@/shared/config/paths';
import { SlideLink } from '@/shared/ui/SlideLink';

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-lg font-semibold">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-gray-500">요청하신 페이지가 없거나 이동되었어요.</p>
      <SlideLink href={PATH.root} replace className="text-sm font-semibold underline">
        홈으로
      </SlideLink>
    </div>
  );
}
