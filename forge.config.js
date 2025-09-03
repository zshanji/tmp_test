// forge.config.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const r = (...p) => path.join(__dirname, ...p); // 절대경로 resolver

export default {
  packagerConfig: {
    asar: true,
    osxSign: false,
    osxNotarize: false,
    icon: r('src', 'icon', 'app'),   // 확장자 없이

    // ✅ 문자열 경로만! (폴더 자체를 복사)
    // 최종 위치는 MY.app/Contents/Resources/<basename>
    extraResource: [
      r('bin'),          // → .../Resources/bin
      r('toy_samples')   // → .../Resources/toy_samples
    ],
  },
  makers: [
    { name: '@electron-forge/maker-zip', platforms: ['darwin'] },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        icon: r('src', 'icon', 'app.icns')  // 절대경로 권장
      }
    }
  ],
  plugins: []
};