import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="font-[SpoqaHanSansNeo-Medium]  mb-[40px] justify-items-center">
      <div className="flex items-end gap-[20px] max-w-[1260px]">
        <div className="gap-[20px] flex h-[50px] items-center">
          <img className="w-[auto] h-[50px]" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer"
            onClick={() => alert('menu')}
          >
            <img className="cursor-pointer" src={`${process.env.PUBLIC_URL}/images/icon-header-menus.png`} alt="menu" />
          </button>
          <ul className="flex gap-[3rem]">
            <li className="text-lg font-semibold">내차팔기</li>
            <li className="text-lg font-semibold">내차사기</li>
            <li className="text-lg font-semibold">렌트</li>
            <li className="text-lg font-semibold">금융</li>
          </ul>
          <div className="flex gap-[32px]">
            <div className="relative">
              <span className="absolute top-[-1px] left-0 w-px h-[24px] bg-[#d8d8d8]" />
            </div>
            <div className="relative text-sm text-[#b70f28] font-[SpoqaHanSansNeo-Medium]">
              <img
                className="absolute top-[-35px] w-[60px] left-[15%] animate-bounce-timedeal"
                src={`${process.env.PUBLIC_URL}/images/icon-header-timedeal.png`}
                alt="menu"
              />
              홈서비스 타임딜
            </div>
            <div className="text-sm text-[#54555a] font-[SpoqaHanSansNeo-Medium]">브랜드 인증관</div>
            <div className="text-sm text-[#54555a] font-[SpoqaHanSansNeo-Medium]">전국 직영점</div>
            <div className="text-sm text-[#54555a] font-[SpoqaHanSansNeo-Medium]">위클리 특가</div>
          </div>
        </div>
        <div className="justify-items-end">
          <div className="flex h-[70px]">
            <button
              onClick={() => navigate(`/login`)}
              className="text-[#999EA1] text-[13px] font-[SpoqaHanSansNeo-Light]"
              type="button"
            >
              로그인
            </button>
            <button
              onClick={() => navigate(`/signup`)}
              className="relative text-[#999EA1] text-[13px] font-[SpoqaHanSansNeo-Light] ml-[16px] pl-[16px]"
              type="button"
            >
              <span className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[1px] h-[12px] bg-[#d8d8d8]" />
              회원가입
            </button>
          </div>
          <div className="relative">
            <IoSearchOutline className="absolute left-[10px] bottom-[11px] size-[25px] text-gray-500" />
            <input
              className="pl-[40px] border border-solid border-[#b70f28] rounded-tl-[4px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[4px] w-[230px] h-[47px] placeholder:text-[14px] placeholder:font-[SpoqaHanSansNeo-Light]"
              placeholder="차량을 검색하세요."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
