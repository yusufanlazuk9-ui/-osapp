import { useState } from 'react';
import { Check, Copy, Download, Terminal } from 'lucide-react';
import { IPhoneSimulator, type DeviceTestTarget } from './components/IPhoneSimulator';
import { EXPO_PROJECT_FILES } from './data/expoFiles';
import { buildZipBlob } from './utils/zip';

export default function App() {
  const [activeFileId, setActiveFileId] = useState<string>('App.tsx');
  const [deviceTarget, setDeviceTarget] = useState<DeviceTestTarget>('iphone');
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  const activeFile =
    EXPO_PROJECT_FILES.find((f) => f.id === activeFileId) ?? EXPO_PROJECT_FILES[0];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopiedFileId(activeFile.id);
      window.setTimeout(() => setCopiedFileId(null), 1800);
    } catch {
      // Clipboard API restricted fallback
    }
  };

  const terminalCommand = 'npm install && npx expo start --ios';

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(terminalCommand);
      setCopiedCmd(true);
      window.setTimeout(() => setCopiedCmd(false), 1800);
    } catch {
      // Clipboard API restricted fallback
    }
  };

  const handleDownloadZip = () => {
    const zipBlob = buildZipBlob(
      EXPO_PROJECT_FILES.map((file) => ({
        path: `merhaba-ios/${file.name}`,
        content: file.content,
      }))
    );
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merhaba-ios-expo.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const codeLines = activeFile.content.split('\n');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900">
      {/* Three-zone Top Navigation */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#onizleme"
            className="text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0"
          >
            Merhaba iOS
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <a
              href="#onizleme"
              className="hover:text-neutral-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Önizleme
            </a>
            <a
              href="#kaynak-kod"
              className="hover:text-neutral-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kaynak Kod
            </a>
            <a
              href="#kisitlamalar"
              className="hover:text-neutral-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kısıtlamalar
            </a>
            <a
              href="#kurulum"
              className="hover:text-neutral-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kurulum
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadZip}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0066D6] whitespace-nowrap shrink-0"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span>Projeyi İndir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Intro */}
        <section className="mb-10 max-w-2xl">
          <p className="text-xs font-medium text-neutral-500">
            React Native Expo <span aria-hidden="true">·</span> Yalnızca iOS{' '}
            <span aria-hidden="true">·</span> Sadece Apple iPhone
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl [text-wrap:balance]">
            Sadece iPhone için Merhaba Uygulaması
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
            Ana ekranında yalnızca &ldquo;Merhaba&rdquo; metnini gösteren, Android, Web ve iPad hedeflerini derleme ve çalışma zamanı seviyesinde kapatan hazır Expo projesi.
          </p>
        </section>

        {/* Two-Column Workspace */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Live iPhone Screen */}
          <section id="onizleme" className="lg:col-span-5">
            <div className="flex flex-col items-center rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <IPhoneSimulator
                deviceTarget={deviceTarget}
                onChangeTarget={setDeviceTarget}
              />
            </div>
          </section>

          {/* Right: Expo Code & Configuration */}
          <div className="space-y-8 lg:col-span-7">
            {/* File Explorer & Code Viewer */}
            <section
              id="kaynak-kod"
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3">
                <div
                  role="tablist"
                  aria-label="Expo proje dosyaları"
                  className="flex flex-wrap items-center gap-1"
                >
                  {EXPO_PROJECT_FILES.map((file) => {
                    const isActive = file.id === activeFile.id;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveFileId(file.id)}
                        className={`min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                          isActive
                            ? 'bg-neutral-900 text-white'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        {file.name}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 whitespace-nowrap shrink-0 transition-colors hover:bg-neutral-50"
                >
                  {copiedFileId === activeFile.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#007AFF]" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border-b border-neutral-100 bg-neutral-50/70 px-5 py-2.5 text-xs text-neutral-600">
                {activeFile.description}
              </div>

              <div className="max-h-[420px] overflow-auto bg-white p-5">
                <pre className="font-mono text-[13px] leading-6 text-neutral-800">
                  <code>
                    {codeLines.map((line, index) => (
                      <div key={index} className="flex">
                        <span className="mr-5 w-6 select-none text-right tabular-nums text-neutral-400">
                          {index + 1}
                        </span>
                        <span className="whitespace-pre">{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </section>

            {/* iPhone-Only Guardrails Summary */}
            <section
              id="kisitlamalar"
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <h2 className="text-base font-semibold text-neutral-900">
                01. Sadece Apple Telefon Kısıtlamaları
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Uygulamanın Android, Web ve iPad cihazlarda çalışmasını engelleyen üç katmanlı yapılandırma:
              </p>

              <div className="mt-5 divide-y divide-neutral-100 border-t border-neutral-100">
                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-mono text-xs font-medium text-neutral-900 shrink-0">
                    platforms: [&quot;ios&quot;]
                  </span>
                  <span className="text-sm text-neutral-600">
                    Expo hedefini yalnızca iOS ile sınırlar; Android ve Web derlemelerini kapatır.
                  </span>
                </div>

                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-mono text-xs font-medium text-neutral-900 shrink-0">
                    supportsTablet: false · UIDeviceFamily: [1]
                  </span>
                  <span className="text-sm text-neutral-600">
                    iPad desteğini kaldırır ve App Store ikilisini yalnızca iPhone ailesine (1) kilitler.
                  </span>
                </div>

                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-mono text-xs font-medium text-neutral-900 shrink-0">
                    Platform.OS !== &apos;ios&apos; || Platform.isPad
                  </span>
                  <span className="text-sm text-neutral-600">
                    Uygulama çalışma zamanında iPhone dışında bir cihaz algılarsa arayüzü çizmez.
                  </span>
                </div>
              </div>
            </section>

            {/* Terminal Setup */}
            <section
              id="kurulum"
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <h2 className="text-base font-semibold text-neutral-900">
                02. iPhone&apos;da Çalıştırma
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Projeyi indirip arşivden çıkardıktan sonra aşağıdaki komutla iOS Simülatör veya iPhone Expo Go üzerinden başlatabilirsiniz.
              </p>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <div className="flex items-center gap-2.5 overflow-x-auto">
                  <Terminal className="h-4 w-4 shrink-0 text-neutral-500" />
                  <code className="font-mono text-xs text-neutral-900 whitespace-nowrap">
                    {terminalCommand}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCommand}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 whitespace-nowrap shrink-0 transition-colors hover:bg-neutral-100"
                >
                  {copiedCmd ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#007AFF]" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
