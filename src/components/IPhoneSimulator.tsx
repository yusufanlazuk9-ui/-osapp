import { Smartphone, Tablet } from 'lucide-react';

export type DeviceTestTarget = 'iphone' | 'ipad' | 'android';

interface IPhoneSimulatorProps {
  deviceTarget: DeviceTestTarget;
  onChangeTarget: (target: DeviceTestTarget) => void;
}

export function IPhoneSimulator({ deviceTarget, onChangeTarget }: IPhoneSimulatorProps) {
  const isAllowed = deviceTarget === 'iphone';

  return (
    <div className="flex flex-col items-center">
      {/* Device Bezel */}
      <div
        className={`relative bg-[#1c1c1e] p-[11px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.22)] transition-all duration-200 ${
          deviceTarget === 'ipad'
            ? 'w-[340px] sm:w-[360px] rounded-[34px]'
            : 'w-[310px] sm:w-[324px] rounded-[50px]'
        }`}
        aria-label="Cihaz önizleme çerçevesi"
      >
        {/* Outer Titanium Rim Highlight */}
        <div
          className={`pointer-events-none absolute inset-0 border border-white/15 ${
            deviceTarget === 'ipad' ? 'rounded-[34px]' : 'rounded-[50px]'
          }`}
        />

        {/* Side Hardware Buttons (iPhone) */}
        {deviceTarget === 'iphone' && (
          <>
            <span className="absolute -left-[3px] top-[106px] h-7 w-[3px] rounded-l bg-[#2c2c2e]" />
            <span className="absolute -left-[3px] top-[148px] h-12 w-[3px] rounded-l bg-[#2c2c2e]" />
            <span className="absolute -left-[3px] top-[206px] h-12 w-[3px] rounded-l bg-[#2c2c2e]" />
            <span className="absolute -right-[3px] top-[162px] h-16 w-[3px] rounded-r bg-[#2c2c2e]" />
          </>
        )}

        {/* Inner Display Canvas */}
        <div
          className={`relative flex flex-col overflow-hidden bg-white ${
            deviceTarget === 'ipad'
              ? 'h-[470px] rounded-[24px]'
              : 'h-[640px] rounded-[40px]'
          }`}
        >
          {/* iOS Status Bar */}
          <div className="relative flex h-12 shrink-0 items-center justify-between px-7 pt-2 text-[12px] font-semibold tracking-tight text-black select-none">
            <span className="tabular-nums">09:41</span>

            {/* Dynamic Island for iPhone */}
            {deviceTarget === 'iphone' && (
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[11px] h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-black"
              />
            )}

            {/* Signal, Wi-Fi, Battery */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                <rect x="0" y="7" width="2.5" height="4" rx="0.6" />
                <rect x="4" y="5" width="2.5" height="6" rx="0.6" />
                <rect x="8" y="3" width="2.5" height="8" rx="0.6" />
                <rect x="12" y="0.5" width="2.5" height="10.5" rx="0.6" />
              </svg>
              <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM8 6.2c-1.8 0-3.4.7-4.6 1.9l1.2 1.2A4.8 4.8 0 0 1 8 7.9c1.3 0 2.5.5 3.4 1.4l1.2-1.2A6.5 6.5 0 0 0 8 6.2Zm0-3.6c-2.8 0-5.3 1.1-7.1 2.9l1.2 1.2A8.3 8.3 0 0 1 8 4.3c2.3 0 4.4.9 5.9 2.4l1.2-1.2A10 10 0 0 0 8 2.6Z" />
              </svg>
              <div className="flex items-center">
                <div className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-black/40 p-[1.5px]">
                  <div className="h-full w-full rounded-[1.5px] bg-black" />
                </div>
                <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r bg-black/40" />
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <main className="flex flex-1 items-center justify-center px-6">
            {isAllowed ? (
              <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-black select-text">
                Merhaba
              </h2>
            ) : (
              <div className="max-w-[240px] text-center">
                <p className="text-sm font-semibold text-neutral-900">
                  {deviceTarget === 'ipad'
                    ? 'iPad Desteklenmiyor'
                    : 'Android Desteklenmiyor'}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {deviceTarget === 'ipad'
                    ? 'supportsTablet: false ve UIDeviceFamily: [1] nedeniyle uygulama yalnızca iPhone cihazlarda çalışır.'
                    : 'platforms: ["ios"] ayarı nedeniyle Android derlemesi kapalıdır ve Platform.OS !== "ios" kontrolü boş döner.'}
                </p>
              </div>
            )}
          </main>

          {/* iOS Home Indicator */}
          <div className="flex h-8 shrink-0 items-end justify-center pb-2.5" aria-hidden="true">
            <div className="h-[4px] w-[112px] rounded-full bg-black/85" />
          </div>
        </div>
      </div>

      {/* Platform Test Switcher */}
      <div className="mt-6 w-full max-w-[324px]">
        <p className="mb-2 text-center text-xs text-neutral-500">
          Hedef cihaz uyumluluğunu test et
        </p>
        <div
          role="group"
          aria-label="Hedef cihaz seçimi"
          className="grid grid-cols-3 gap-1 rounded-xl border border-neutral-200 bg-white p-1"
        >
          <button
            type="button"
            onClick={() => onChangeTarget('iphone')}
            className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium whitespace-nowrap transition-colors ${
              deviceTarget === 'iphone'
                ? 'bg-[#007AFF] text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 shrink-0" />
            <span>iPhone</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeTarget('ipad')}
            className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium whitespace-nowrap transition-colors ${
              deviceTarget === 'ipad'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Tablet className="h-3.5 w-3.5 shrink-0" />
            <span>iPad</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeTarget('android')}
            className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium whitespace-nowrap transition-colors ${
              deviceTarget === 'android'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 shrink-0" />
            <span>Android</span>
          </button>
        </div>
      </div>
    </div>
  );
}
