// 앱 아이콘 생성기 — assets/app-icon/logo.svg(주황 로고 마크)를 흰 배경 위에 중앙 배치하여
// iOS(AppIcon.appiconset) / Android(mipmap) 아이콘을 일괄 생성한다.
// 실행: node apps/mobile/scripts/generate-app-icons.mjs
import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mobileRoot = resolve(__dirname, '..');

const BG = '#FFFFFF'; // Figma symbol 배경(흰색)
const LOGO_RATIO = 0.58; // 아이콘 너비 대비 로고 너비(Figma 패딩 재현)
const LOGO = readFileSync(resolve(mobileRoot, 'assets/app-icon/logo.svg'));
const LOGO_ASPECT = 69 / 74; // 로고 원본 height/width

// 로고를 지정 픽셀 너비로 크리스프하게 렌더
async function renderLogo(widthPx) {
  const density = Math.ceil((72 * widthPx) / 74); // 원본 74px 기준 업스케일 밀도
  return sharp(LOGO, { density })
    .resize({ width: Math.round(widthPx) })
    .png()
    .toBuffer();
}

// size×size 흰 배경 위에 로고 중앙 합성. round=true면 원형 마스크(모서리 투명).
async function makeIcon(size, { round = false, flatten = false } = {}) {
  const logoW = Math.round(size * LOGO_RATIO);
  const logo = await renderLogo(logoW);
  const logoH = Math.round(logoW * LOGO_ASPECT);

  // 흰 배경 위에 로고 중앙 합성
  const composited = await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: logo,
        top: Math.round((size - logoH) / 2),
        left: Math.round((size - logoW) / 2),
      },
    ])
    .png()
    .toBuffer();

  let out = sharp(composited);

  if (round) {
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
    );
    out = out.composite([{ input: mask, blend: 'dest-in' }]);
  }

  if (flatten) {
    // iOS 마케팅 아이콘은 알파 채널 불가 → 흰 배경으로 평탄화(composite 이후 적용)
    out = out.flatten({ background: BG });
  }
  return out.png().toBuffer();
}

function write(path, buf) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buf);
  console.log('✓', path.replace(mobileRoot + '/', ''));
}

async function main() {
  // iOS: 단일 1024 universal AppIcon (Xcode 14+, RN 0.86)
  const iosDir = resolve(mobileRoot, 'ios/OnsquadMobile/Images.xcassets/AppIcon.appiconset');
  write(resolve(iosDir, 'AppIcon.png'), await makeIcon(1024, { flatten: true }));
  writeFileSync(
    resolve(iosDir, 'Contents.json'),
    JSON.stringify(
      {
        images: [
          { filename: 'AppIcon.png', idiom: 'universal', platform: 'ios', size: '1024x1024' },
        ],
        info: { author: 'xcode', version: 1 },
      },
      null,
      2,
    ) + '\n',
  );
  console.log('✓ ios/.../AppIcon.appiconset/Contents.json');

  // Android: mipmap 밀도별 square + round
  const densities = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  const resDir = resolve(mobileRoot, 'android/app/src/main/res');
  for (const [name, size] of Object.entries(densities)) {
    write(resolve(resDir, `mipmap-${name}/ic_launcher.png`), await makeIcon(size));
    write(resolve(resDir, `mipmap-${name}/ic_launcher_round.png`), await makeIcon(size, { round: true }));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
