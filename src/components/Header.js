import React from 'react';
import './style.css';

export default function Header() {
  return (
    <header className="w-[1220px] mb-[40px] flex justify-center">
      <div className="flex h-[50px] items-center">
        <img className="w-[120px] h-[47px]" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
        <button type="button" className="flex items-center justify-center cursor-pointer" onClick={() => alert('menu')}>
          <img className="cursor-pointer" src={`${process.env.PUBLIC_URL}/images/icon-header-menus.png`} alt="menu" />
        </button>
        <ul className="flex gap-[3rem]">
          <li className="text-lg font-semibold">내차팔기</li>
          <li className="text-lg font-semibold">내차사기</li>
          <li className="text-lg font-semibold">렌트</li>
          <li className="text-lg font-semibold">금융</li>
        </ul>
        <div className="flex gap-[3rem]">
          <div className="text-sm">홈서비스 타임딜</div>
          <div className="text-sm">브랜드 인증관</div>
          <div className="text-sm">전국 직영점</div>
          <div className="text-sm">위클리 특가</div>
        </div>
      </div>
      <div className="header-util-area">
        <div>
          <button type="button">로그인</button>
          <button type="button">회원가입</button>
        </div>
        <input />
      </div>
    </header>
  );
}
