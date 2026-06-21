'use client';

import { useRef } from 'react';

import Image from 'next/image';
import { Controller, FieldValues, FormProvider, Path, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/Input';
import { InputButton } from '@/shared/ui/InputButton';

import { JoinSchemaType } from './validator';

// https 고정: iOS WKWebView ATS(NSAllowsArbitraryLoads=false)는 http://localhost 페이지에서
// protocol-relative(`//`)로 해석된 외부 http 스크립트를 차단한다. https는 허용된다.
const DAUM_POSTCODE_SRC = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

// daum 우편번호 스크립트를 사용 시점에 로드한다.
// 이미 로드됐으면 즉시, 로딩 중인 태그가 있으면 그 onload를 기다리고, 없으면 새로 주입한다.
const loadDaumPostcode = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.daum?.Postcode) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${DAUM_POSTCODE_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('daum postcode 로드 실패')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = DAUM_POSTCODE_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('daum postcode 로드 실패'));
    document.head.appendChild(script);
  });

interface AddressSearchProps<T extends FieldValues> {
  name: Path<T>;
  onAddressChange: (address: string) => void;
}

const AddressSearch = <T extends FieldValues>(props: AddressSearchProps<T>) => {
  const { name, onAddressChange } = props;
  const method = useFormContext<JoinSchemaType>();

  const { control } = method;

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const foldDaumPostcode = () => {
    if (!wrapRef.current) return;

    wrapRef.current.style.display = 'none';
  };

  const execDaumPostcode = async () => {
    await loadDaumPostcode();

    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: (data: any) => {
        let addr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (wrapRef.current) {
          wrapRef.current.style.display = 'none';
        }

        document.body.scrollTop = currentScroll;

        onAddressChange(addr);
      },

      onresize: (size: { height: number }) => {
        if (!wrapRef.current) return;

        wrapRef.current.style.height = `${size.height}px`;
      },
      width: '100%',
      height: '100%',
    }).embed(wrapRef.current);

    if (wrapRef.current) {
      wrapRef.current.style.display = 'block';
      wrapRef.current.style.maxHeight = '33rem';
    }
  };

  return (
    <>
      <div className="mb-2 w-full">
        <FormProvider {...method}>
          <Controller
            name="address"
            control={control}
            render={({ field: { value } }) => (
              <Input
                name={name}
                label="주소"
                type="text"
                readOnly
                placeholder="주소를 검색해주세요."
                button={<InputButton buttonText="주소검색" color="#000" onClick={() => searchRef.current?.click()} />}
                value={value as string}
              />
            )}
          />
        </FormProvider>

        <input ref={searchRef} className="hidden" type="button" onClick={execDaumPostcode} value="주소검색" />
      </div>

      <div className="relative my-1 hidden h-auto w-full border border-black" ref={wrapRef}>
        <Image
          src="https://t1.daumcdn.net/postcode/resource/images/close.png"
          className="cursur-pointer absolute right-0 top-[-1px] z-10"
          onClick={foldDaumPostcode}
          width={16}
          height={16}
          alt="접기 버튼"
        />
      </div>
    </>
  );
};

export default AddressSearch;
