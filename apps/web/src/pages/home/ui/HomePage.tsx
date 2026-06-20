import Image from 'next/image';

import { MainDashboard } from '@/widgets/MainDashboard';

// import { SearchContainer } from '@/widgets/SearchContainer';

import { Text } from '@/shared/ui/Text';

import { HomeCrewList } from './HomeCrewList';

// 메인페이지는 ISR 정적 셸. 크루 리스트는 per-user(권한) 개인화 데이터라 서버에서
// prefetch 하지 않고 클라이언트(HomeCrewList)에서 가져온다. 서버가 백엔드/auth 에
// 의존하지 않으므로 백엔드 미가동에도 빌드/ISR prerender 가 깨지지 않는다.
function HomePage() {
  return (
    <div className="h-full w-full bg-gray-50">
      <div className="flex w-full items-center justify-between rounded-xl bg-[#144A7D] p-9 ease-linear S2:flex-col SE:flex-col mobile:flex-col tablet:flex-col">
        <Image
          src="/images/main_banner.svg"
          width={220}
          height={110}
          className="hidden h-auto w-auto S2:mb-12 S2:inline-block SE:mb-12 SE:inline-block mobile:mb-12 mobile:inline-block tablet:mb-12 tablet:inline-block"
          alt="온스쿼드 배너"
          priority={true}
        />
        <div className="font-semibold text-white">
          <Text.lg className="mb-1 S2:text-sm">모임이 좋았을 뿐인데,,,</Text.lg>
          <Text.xxl className="mb-2">
            <h2 className="flex items-center S2:text-xs">
              점점 <Text.xxxl className="ml-1 font-extrabold S2:text-xl">부담</Text.xxxl>이 되고 있다면?
            </h2>
          </Text.xxl>
          <div className="flex flex-col gap-3 mobile:flex-row tablet:flex-row">
            <Image
              src="/icons/onsquad_logo.svg"
              alt="온스쿼드 로고"
              className="h-auto w-auto"
              width={150}
              height={50}
            />
            <Text.lg>에 합류하세요!</Text.lg>
          </div>
        </div>
        <Image
          src="/images/main_banner.svg"
          width={220}
          height={110}
          className="h-auto w-auto S2:hidden SE:hidden mobile:hidden tablet:hidden"
          alt="온스쿼드 배너"
          priority={true}
        />
      </div>

      <div className="mt-6" />
      <section className="flex w-full items-center justify-center gap-4 S2:flex-col SE:flex-col mobile:flex-col tablet:flex-col">
        <MainDashboard />
      </section>
      <section>
        <HomeCrewList />
      </section>
    </div>
  );
}

export default HomePage;
