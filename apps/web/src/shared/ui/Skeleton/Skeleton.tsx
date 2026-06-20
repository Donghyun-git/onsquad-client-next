import React from 'react';

const SkeletonBase = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

const CrewCardSkeleton = () => {
  return (
    <div className="w-[20rem] rounded-2xl bg-white S2:w-full SE:w-full mobile:w-full tablet:w-full">
      {/* 이미지 영역 스켈레톤 */}
      <div className="relative h-[15rem] w-[20rem] overflow-hidden rounded-t-lg S2:w-full SE:w-full mobile:w-full tablet:w-full">
        <SkeletonBase className="h-full w-full rounded-t-lg" />
        {/* 제목 오버레이 스켈레톤 */}
        <div className="bg-gradient-to-t absolute bottom-0 left-0 w-full from-black/50 to-transparent p-2">
          <SkeletonBase className="h-6 w-3/4 bg-gray-300" />
        </div>
      </div>

      {/* 콘텐츠 영역 스켈레톤 */}
      <div className="flex flex-col gap-2 p-2">
        {/* 프로필 영역 */}
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-5 w-5 rounded-full" />
          <SkeletonBase className="h-4 w-16" />
        </div>

        {/* 설명 영역 */}
        <div className="space-y-1">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-3/4" />
        </div>
      </div>

      {/* 태그 영역 스켈레톤 */}
      <div className="flex gap-1 rounded-b-[1.1rem] px-2 py-1.5">
        <SkeletonBase className="h-6 w-12 rounded-full" />
        <SkeletonBase className="h-6 w-16 rounded-full" />
        <SkeletonBase className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
};

// 리스트용 스켈레톤 (여러 개 카드)
const CrewListSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 place-items-center gap-y-4 S2:grid-cols-1 SE:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1">
      {Array.from({ length: count }).map((_, index) => (
        <CrewCardSkeleton key={index} />
      ))}
    </div>
  );
};

// 페이지 전체 스켈레톤
const MyCrewPageSkeleton = () => {
  return (
    <div className="container px-5 pb-6 pt-20">
      {/* 섹션 제목 스켈레톤 */}
      <div className="flex items-center gap-2 py-6">
        <SkeletonBase className="h-6 w-32" />
        <SkeletonBase className="h-8 w-16 rounded" />
      </div>

      {/* 내가 개설한 크루 스켈레톤 */}
      <div className="mb-8">
        <CrewListSkeleton count={2} />
      </div>

      {/* 나의 크루 섹션 제목 */}
      <div className="flex items-center justify-between gap-2 pb-6 pt-[30px]">
        <SkeletonBase className="h-6 w-24" />
        <SkeletonBase className="h-8 w-32 rounded-full" />
      </div>

      {/* 나의 크루 스켈레톤 */}
      <CrewListSkeleton count={2} />
    </div>
  );
};

// 간단한 로딩 스켈레톤
const SimpleLoadingSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 px-4">
        <SkeletonBase className="mx-auto h-8 w-3/4" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-5/6" />
        <SkeletonBase className="h-4 w-4/6" />
      </div>
    </div>
  );
};

// Export 모든 스켈레톤 컴포넌트
export const Skeleton = {
  Base: SkeletonBase,
  CrewCard: CrewCardSkeleton,
  CrewList: CrewListSkeleton,
  MyCrewPage: MyCrewPageSkeleton,
  SimpleLoading: SimpleLoadingSkeleton,
};
