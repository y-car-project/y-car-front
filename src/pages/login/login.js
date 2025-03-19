import React, { useState } from 'react';
import Slider from 'react-slick';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { FaCircleXmark } from 'react-icons/fa6';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/** 커스텀 Dot 컴포넌트 (밖에서 정의) */
function CustomDot() {
  return (
    <div
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'gray',
        cursor: 'default',
      }}
    />
  );
}

/** dots를 부모 컨테이너에 특정 위치에 배치하는 함수 */
const appendDotsFn = (dots) => (
  <div
    style={{
      position: 'absolute',
      top: '100px',
      left: '40%',
      zIndex: 10,
    }}
  >
    <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
  </div>
);

/** 각 dot 모양을 CustomDot으로 설정 */
const customPagingFn = () => <CustomDot />;

/** react-slick 설정 (prop spreading 없이 개별 전달) */
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  draggable: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  appendDots: appendDotsFn,
  customPaging: customPagingFn,
};

export default function Login() {
  const [userId, setUserId] = useState('');
  const [idError, setIdError] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();
  /** 아이디 검증 */
  const validateUserId = (id) => {
    if (id === '') setIdError('아이디를 입력해주세요.');
    else setIdError('');
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    validateUserId(e.target.value);
    setDuplicateMessage('');
  };

  const handleUserIdBlur = () => {
    validateUserId(userId);
  };

  /** 비밀번호 검증 */
  const validatePassword = (pwd) => {
    if (pwd === '') setPasswordError('비밀번호를 입력해주세요.');
    else setPasswordError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  /** 로그인 버튼 */
  const handleSignup = async () => {
    if (userId.trim() === '') validateUserId(userId);
    if (password.trim() === '') validatePassword(password);
    if (userId.trim() === '' || password.trim() === '') return;
    try {
      const response = await axios.post(`http://localhost:8080/tokenLogin`, {
        user_id: userId,
        user_pwd: password,
      });

      if (response.status === 200 && response.data.success) {
        // 로그인 성공 처리
        sessionStorage.setItem('Authorization', response.data.Authorization);
        alert('로그인 성공!');
        navigate('/main');
      } else {
        setIdError('');
        setPasswordError('');
        setDuplicateMessage(response.data.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      alert('서버와의 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex w-[75%] min-h-screen font-[SpoqaHanSansNeo-Medium]">
      {/* 왼쪽: 로그인 폼 */}
      <div className="ml-[25%] flex flex-col justify-center items-center bg-white">
        <div className="login-box">
          <a href="/main">
            <img className="w-auto h-[50px] mb-[10%]" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
          </a>
          <h3 className="flex text-[18px] font-bold text-left mb-4 pl-[20%] text-[#b70f28]">회원</h3>

          <div className="w-full h-[2px] bg-[#b70f28] mb-10" />
          {/* 아이디 영역 */}
          <div className={`transition-all duration-300 ${idError ? 'mb-6' : 'mb-4'}`}>
            <div className="relative w-[590px] h-[56px]">
              <input
                id="userId"
                name="userId"
                className={`w-full h-full border rounded-lg px-3 ${
                  idError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                placeholder="아이디 입력"
                type="text"
                autoComplete="off"
                value={userId}
                onChange={handleUserIdChange}
                onBlur={handleUserIdBlur}
              />
              {userId && (
                <button
                  type="button"
                  className="absolute top-[20%] right-[10px] w-8 h-8 flex items-center justify-center rounded-full text-[20px] text-gray-200"
                  onClick={() => setUserId('')}
                >
                  <FaCircleXmark />
                </button>
              )}
            </div>
            {(idError || duplicateMessage) && (
              <p className="text-red-500 text-sm mt-1">{idError || duplicateMessage}</p>
            )}
          </div>
          {/* 비밀번호 영역 */}
          <div className={`transition-all duration-300 ${passwordError ? 'mb-6' : 'mb-4'}`}>
            <div className="relative w-[590px] h-[56px]">
              <input
                id="password"
                name="password"
                className={`w-full h-full border rounded-lg px-3 ${
                  passwordError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                placeholder="비밀번호 입력"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              {password && (
                <button
                  type="button"
                  className="absolute top-[20%] right-[10px] w-8 h-8 flex items-center justify-center rounded-full text-[20px]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </button>
              )}
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          {/* 체크박스 2개 */}
          <div className="flex items-center space-x-8 mb-4 text-[14px] font-[SpoqaHanSansNeo-Regular]">
            <label htmlFor="keep-login" className="flex items-center cursor-pointer select-none">
              <input
                id="keep-login"
                type="checkbox"
                className="sr-only"
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              />
              <RiCheckboxCircleFill
                className="mr-2 text-[24px]"
                style={{ color: keepLoggedIn ? '#b70f28' : '#e5e7eb' }}
              />
              <span>로그인 상태 유지</span>
            </label>
            <label htmlFor="id-save" className="flex items-center cursor-pointer select-none">
              <input
                id="id-save"
                type="checkbox"
                className="sr-only"
                checked={saveId}
                onChange={() => setSaveId(!saveId)}
              />
              <RiCheckboxCircleFill className="mr-2 text-[24px]" style={{ color: saveId ? '#b70f28' : '#e5e7eb' }} />
              <span>아이디 저장</span>
            </label>
          </div>
          {/* 로그인 버튼 */}
          <div className="mt-[3%] mb-[3%]">
            <button
              className="w-[590px] h-[56px] rounded-md text-white bg-[#b70f28]"
              type="button"
              onClick={handleSignup}
            >
              로그인
            </button>
          </div>
          {/* 회원가입 / 아이디 찾기 / 비밀번호 찾기 */}
          <div className="flex justify-center items-center gap-4 mb-10 text-gray-800 text-[14px]">
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate('/signup');
              }}
            >
              회원가입
            </button>
            <span className="text-gray-200">|</span>
            <button type="button" className="hover:underline font-[SpoqaHanSansNeo-Light]">
              아이디 찾기
            </button>
            <span className="text-gray-200">|</span>
            <button type="button" className="hover:underline font-[SpoqaHanSansNeo-Light]">
              비밀번호 찾기
            </button>
          </div>
          {/* 구분선 + "3초 만에 가입하고 로그인" */}
          <div className="flex items-center justify-center my-4">
            <div className="w-[33%] h-[1px] bg-gray-100" />
            <span className="mx-4 text-sm text-gray-500 font-[SpoqaHanSansNeo-Light]">3초 만에 가입하고 로그인</span>
            <div className="w-[33%] h-[1px] bg-gray-100" />
          </div>
          {/* 소셜 로그인 버튼들 (카카오/네이버/Apple) */}
          <div className="flex items-center justify-center gap-6">
            {/* 카카오 */}
            <div className="flex flex-col items-center">
              <a
                href="http://localhost:8080/kakaoLogin"
                className="w-[60px] h-[60px] text-black font-bold flex items-center justify-center"
              >
                <img
                  className="w-auto h-[56px] "
                  src={`${process.env.PUBLIC_URL}/images/icon-login-kakao.svg`}
                  alt="logo"
                />
              </a>
              <span className="text-[12px] text-gray-500">카카오</span>
            </div>
            {/* 네이버 */}
            <div className="flex flex-col items-center mx-6">
              <button type="button" className="w-[60px] h-[60px] text-black font-bold flex items-center justify-center">
                <img
                  className="w-auto h-[56px] "
                  src={`${process.env.PUBLIC_URL}/images/icon-login-naver.svg`}
                  alt="logo"
                />
              </button>
              <span className="text-[12px] text-gray-500">네이버</span>
            </div>
            {/* Apple */}
            <div className="flex flex-col items-center">
              <button type="button" className="w-[60px] h-[60px]  font-bold flex items-center justify-center">
                <img
                  className="w-auto h-[56px] "
                  src={`${process.env.PUBLIC_URL}/images/icon-login-apple.svg`}
                  alt="logo"
                />
              </button>
              <span className="text-[12px] text-gray-500">Apple</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 캐러셀 (이미지 위 dots) */}
      <div className="ml-[5%] flex items-center justify-center">
        <div className="relative w-[590px] h-[741px]">
          <Slider
            dots={carouselSettings.dots}
            infinite={carouselSettings.infinite}
            speed={carouselSettings.speed}
            slidesToShow={carouselSettings.slidesToShow}
            slidesToScroll={carouselSettings.slidesToScroll}
            swipe={carouselSettings.swipe}
            draggable={carouselSettings.draggable}
            arrows={carouselSettings.arrows}
            autoplay={carouselSettings.autoplay}
            autoplaySpeed={carouselSettings.autoplaySpeed}
            appendDots={carouselSettings.appendDots}
            customPaging={carouselSettings.customPaging}
          >
            {/* 슬라이드1 */}
            <div className="w-[490px] h-[741px]">
              <img
                src={`${process.env.PUBLIC_URL}/images/slide1.png`}
                alt="슬라이드1"
                className="w-full h-full object-contain"
              />
            </div>
            {/* 슬라이드2 */}
            <div className="w-[490px] h-[741px]">
              <img
                src={`${process.env.PUBLIC_URL}/images/slide2.png`}
                alt="슬라이드2"
                className="w-full h-full object-contain"
              />
            </div>
            {/* 슬라이드3 */}
            <div className="w-[490px] h-[741px]">
              <img
                src={`${process.env.PUBLIC_URL}/images/slide3.png`}
                alt="슬라이드3"
                className="w-full h-full object-contain"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
