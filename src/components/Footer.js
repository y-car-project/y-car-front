import * as React from 'react';
import { BiSolidDownload } from 'react-icons/bi';

export default function Footer() {
  return (
    <div className="relative bg-[#F9FAFB] h-[277px] font-[SpoqaHanSansNeo-Medium]">
      {/* 기존 내용 (왼쪽 정렬 유지) */}
      <div>
        <dl>
          <dt className="text-[22px] font-[SpoqaHanSansNeo-Bold] pl-[20%] pt-[2%]">내차 사고 팔 땐</dt>
        </dl>
        <dd>
          <strong className="text-[34px] font-[SpoqaHanSansNeo-Bold] pl-[20%] text-[#b70f28]">1588-5455</strong>
        </dd>
        <dd className="text-[14px]  mb-[1%]">
          <span className="pl-[20%] text-[#54555a]">내차사기 홈서비스 (연결 1번) / 일반문의 (연결 4번)</span>{' '}
          <span className="pl-[2%] text-[#54555a]">
            월~토요일 <strong>09:00~18:00</strong>
          </span>{' '}
          <span className="pl-[2%] text-[#54555a]">
            법정공휴일/일요일 | <strong>휴무</strong>
          </span>
        </dd>
        <dd className="text-[14px]  mb-[1%]">
          <span className="pl-[20%] text-[#54555a]">내차팔기 홈서비스 (연결 2번)</span>{' '}
          <span className="pl-[2%] text-[#54555a]">
            월~일요일 | <strong>09:00~18:00</strong>
          </span>{' '}
          <span className="pl-[2%] text-[#54555a]">
            법정공휴일 | <strong>휴무</strong>
          </span>
        </dd>
        <dd className="text-[14px] ">
          <span className="pl-[20%] text-[#54555a]">사업제휴문의(partnership@Ycar.com)</span>{' '}
          <span className="pl-[2%] text-[#54555a]">
            광고문의(ads@Ycar.com)
            <strong className="ml-[2%] text-[#b70f28] border-[1px] border-solid border-[#b70f28] rounded-md inline-block p-0">
              <a href="/" className="ml-[7px] mr-[7px] inline-flex items-center gap-1">
                Y Car 매체소개서 <BiSolidDownload />
              </a>
            </strong>
          </span>
        </dd>
      </div>

      {/* 오른쪽 infolink - 기존 내용 유지하면서 오른쪽 정렬 */}
      <div className="absolute right-[20%] top-[15%] text-[#54555a] text-[14px] font-[SpoqaHanSansNeo-Medium]">
        <div className="infolink flex gap-6">
          <ul>
            <li className="mb-2">
              <a href="/">회사소개</a>
            </li>
            <li className="mb-2">
              <a href="/">IR</a>
            </li>
            <li className="mb-2">
              <a href="/">보증서비스</a>
            </li>
            <li className="mb-2">
              <a href="/">고객지원</a>
            </li>
          </ul>
          <ul>
            <li className="mb-2">
              <a href="/">ESG</a>
            </li>
            <li className="mb-2">
              <a href="/">인재채용</a>
            </li>
            <li className="mb-2">
              <a href="/">이용약관</a>
            </li>
            <li className="mb-2">
              <a href="/">Foreigner Support</a>
            </li>
          </ul>
          <ul>
            <li className="mb-2">
              <a href="/">
                <strong className="text-[#B70F28]">개인정보처리방침</strong>
              </a>
            </li>
            <li className="mb-2">
              <a href="/">윤리경영</a>
            </li>
            <li className="mb-2">
              <a href="/">비윤리제보</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
