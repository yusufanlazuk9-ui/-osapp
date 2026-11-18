export interface ExpoProjectFile {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const EXPO_PROJECT_FILES: ExpoProjectFile[] = [
  {
    id: 'App.tsx',
    name: 'App.tsx',
    description: 'Ana ekranda yalnızca "Merhaba" gösteren ve iPhone dışı cihazları engelleyen kök bileşen.',
    content: `import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Sadece Apple iPhone cihazlarda çalışması için çalışma zamanı kontrolü
  if (Platform.OS !== 'ios' || Platform.isPad) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <Text style={styles.greeting}>Merhaba</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: -0.5,
    color: '#000000',
  },
});`,
  },
  {
    id: 'app.json',
    name: 'app.json',
    description: 'Expo derlemesini yalnızca iOS ve iPhone (UIDeviceFamily: 1) ile sınırlandıran yapılandırma.',
    content: `{
  "expo": {
    "name": "Merhaba",
    "slug": "merhaba-ios",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios"],
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.merhaba.iosapp",
      "buildNumber": "1",
      "requireFullScreen": true,
      "infoPlist": {
        "UIDeviceFamily": [1]
      }
    }
  }
}`,
  },
  {
    id: 'package.json',
    name: 'package.json',
    description: 'Yalnızca iOS başlatma ve derleme komutlarını içeren Expo bağımlılık listesi.',
    content: `{
  "name": "merhaba-ios",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start --ios",
    "ios": "expo run:ios"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}`,
  },
  {
    id: 'eas.json',
    name: 'eas.json',
    description: 'Apple App Store ve iOS Simülatör için EAS Build profilleri.',
    content: `{
  "cli": {
    "version": ">= 13.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  }
}`,
  },
  {
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    description: 'Expo tabanlı katı TypeScript yapılandırması.',
    content: `{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}`,
  },
  {
    id: 'README.md',
    name: 'README.md',
    description: 'Kurulum ve gerçek iPhone üzerinde çalıştırma adımları.',
    content: `# Merhaba — Sadece iPhone (Expo iOS)

Bu proje, **React Native (Expo)** kullanılarak yalnızca **Apple iPhone** cihazlarda çalışacak şekilde yapılandırılmıştır.

## iPhone'a Özgü Kısıtlamalar
- \`app.json\` içinde \`"platforms": ["ios"]\` ile Android ve Web hedefleri devre dışı bırakılmıştır.
- \`ios.supportsTablet: false\` ve \`ios.infoPlist.UIDeviceFamily: [1]\` ile yalnızca iPhone (iPad hariç) hedeflenir.
- \`App.tsx\` içinde \`Platform.OS === 'ios' && !Platform.isPad\` çalışma zamanı kontrolü bulunur.

## Çalıştırma
\`\`\`bash
npm install
npx expo start --ios
\`\`\`

Gerçek iPhone cihazında **Expo Go** ile açmak için \`npx expo start\` komutunu çalıştırıp QR kodu iPhone kamerası ile tarayın.`,
  },
];
