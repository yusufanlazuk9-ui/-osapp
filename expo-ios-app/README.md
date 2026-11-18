# Merhaba — Sadece iPhone (Expo iOS)

Bu proje, **React Native (Expo)** kullanılarak yalnızca **Apple iPhone** cihazlarda çalışacak şekilde yapılandırılmıştır.

## iPhone'a Özgü Kısıtlamalar
- `app.json` içinde `"platforms": ["ios"]` ile Android ve Web hedefleri devre dışı bırakılmıştır.
- `ios.supportsTablet: false` ve `ios.infoPlist.UIDeviceFamily: [1]` ile yalnızca iPhone (iPad hariç) hedeflenir.
- `App.tsx` içinde `Platform.OS === 'ios' && !Platform.isPad` çalışma zamanı kontrolü bulunur.

## Çalıştırma
```bash
npm install
npx expo start --ios
```

Gerçek iPhone cihazında **Expo Go** ile açmak için `npx expo start` komutunu çalıştırıp QR kodu iPhone kamerası ile tarayın.
