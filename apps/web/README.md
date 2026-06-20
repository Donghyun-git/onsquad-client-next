# OnSquad

> 취미 생활의 즐거움을 찾아봐요

`2024.02 ~ 진행 중`

![](https://dongre.dev/static/images/onsquad.jpeg)

## 프로젝트 소개

OnSquad는 취미 생활을 즐기는 사람들을 위한 커뮤니티 플랫폼입니다. 여러분의 취미 생활을 공유하고, 소통하며, 크루와 스쿼드를 생성하여 취미 커뮤니티를 활성화 할 수 있도록 돕습니다.

## 프로젝트 구조

OnSquad Client 는 Next.js 15 App Router 를 사용하고 있습니다.

```sh
$ npm install

$ touch .env.local

$ npx auth secret # AUTH.SECRET 키를 생성합니다.

$ cp ./.env.example .env # 환경변수를 세팅합니다.

$ npm run dev
```

## Tech Stack

기술 스택은 아래와 같이 사용하고 있습니다.

- Next.js 15 App Router `15.2.4`
- Tailwind CSS
- TypeScript
- next-auth `5.0.0-beta.25`
- shadcn/UI
- React Hook Form
- React Query `5.x.x`
- Zustand
