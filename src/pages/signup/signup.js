import React, { useState } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [emailDomain, setEmailDomain] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const navigate = useNavigate();

  const validateUserId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{4,12}$/;
    if (!idRegex.test(id)) {
      setIdError('아이디는 영문과 숫자를 조합하여 4~12자로 입력하세요.');
    } else {
      setIdError('');
    }
  };

  const validatePassword = (pw) => {
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-_])[A-Za-z\d!@#$%^*+=-_]{8,20}$/;
    if (!pwRegex.test(pw)) {
      setPasswordError('비밀번호는 대/소문자, 숫자, 특수문자를 포함하여 8~20자로 입력하세요.');
    } else {
      setPasswordError('');
    }
  };

  const validateUserName = (name) => {
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      setNameError('이름은 영문이나 한글만 입력 가능합니다.');
    } else {
      setNameError('');
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    validateUserId(e.target.value);
    setDuplicateMessage('');
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    validateUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmailUser(e.target.value);
  };

  const handleDomainChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setEmailDomain('');
      setCustomDomain('');
    } else {
      setEmailDomain(selectedValue);
      setCustomDomain('');
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError('전화번호 형식은 010-0000-0000 이어야 합니다.');
    } else {
      setPhoneError('');
    }
  };
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    refund: false,
    marketing: false,
    sms: false,
  });

  const toggleCheckbox = (name) => {
    setAgreements((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isRequiredAgreementsChecked = agreements.terms && agreements.privacy && agreements.refund;

  const handleDuplicateCheck = async () => {
    if (!userId) {
      setDuplicateMessage('아이디를 입력해주세요.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/checkUserId?userId=${userId}`);
      const data = await response.json();
      if (data.available) {
        setDuplicateMessage('사용 가능한 아이디입니다.');
      } else {
        setDuplicateMessage('이미 사용중인 아이디입니다.');
      }
    } catch (error) {
      console.error('중복 확인 에러:', error);
      setDuplicateMessage('중복 확인에 실패했습니다.');
    }
  };

  const handleSignup = async () => {
    // 모든 필수 입력값 체크
    if (!userName || !userId || !emailUser || !phoneNumber || !password || !confirmPassword) {
      setIdError('아이디는 영문과 숫자를 조합하여 4~12자로 입력하세요.');
      setPasswordError('비밀번호는 대/소문자, 숫자, 특수문자를 포함하여 8~20자로 입력하세요.');
      setPhoneError('전화번호 형식은 010-0000-0000 이어야 합니다.');
      setNameError('이름은 영문이나 한글만 입력 가능합니다.');
      return;
    }
    // 이메일 도메인도 체크 (customDomain 또는 emailDomain 중 하나는 있어야 함)
    if (!(customDomain || emailDomain)) {
      alert('이메일 도메인을 선택하거나 직접 입력해 주세요.');
      return;
    }
    // 입력한 값들에 오류가 있는지 확인
    if (nameError || idError || passwordError || confirmPasswordError || phoneError) {
      alert('입력한 정보에 오류가 있습니다. 확인해 주세요.');
      return;
    }

    if (!isRequiredAgreementsChecked) {
      alert('필수 약관에 모두 동의하셔야 합니다.');
      return;
    }
    const domain = customDomain || emailDomain;
    const email = `${emailUser}@${domain}`;

    const payload = {
      user_id: userId,
      user_name: userName,
      user_email: email,
      user_pwd: password,
      user_phone: phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:8080/insertMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('회원가입 성공:', data);
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입에 실패했습니다.');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center font-[SpoqaHanSansNeo-Medium]">
      <div className="text-center mb-8 ">
        <h2 className="text-[34px] font-[SpoqaHanSansNeo-Bold]">회원가입</h2>
        <p className="text-[16px] text-[#54555a] font-[SpoqaHanSansNeo-Reuglar]">
          안전한 회원가입을 위해 본인인증을 진행해 주세요.
        </p>
      </div>
      <div className="w-[1243px] mt-4 mb-[3%]">
        <h3 className="text-[20px] font-[SpoqaHanSansNeo-Bold] text-left">정보를 입력해 주세요.</h3>
        <div className="w-full h-[2px] bg-gray-300 mt-2" />
      </div>
      <form>
        <div className="fist-line flex gap-x-10 mb-[3%]">
          <div className="flex-auto">
            이름
            <div>
              <input
                className={`w-[590px] h-[56px] border rounded px-3 ${
                  nameError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type="text"
                placeholder=" 이름"
                value={userName}
                onChange={handleUserNameChange}
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>
          </div>
          <div className="flex-auto">
            아이디
            <div className="flex items-center gap-2">
              <input
                id="userId"
                name="userId"
                className={`w-[460px] h-[56px] border rounded px-3 ${
                  idError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type="text"
                autoComplete="off"
                placeholder="아이디 입력"
                value={userId}
                onChange={handleUserIdChange}
              />
              <button
                className="w-[120px] h-[56px] border rounded-md border-gray-300"
                type="button"
                onClick={handleDuplicateCheck}
              >
                <span>중복확인</span>
              </button>
            </div>
            <p className="text-red-500 text-sm min-h-[20px] mt-1">{idError || duplicateMessage}</p>
            <div>
              <span className="text-[#999ea1] text-[14px]">※ 영문, 숫자를 조합해서 입력해 주세요.(4~12자)</span>
            </div>
          </div>
        </div>
        <div className="second-line flex mb-[3%]">
          <div className="flex-auto">
            비밀번호
            <div>
              <input
                id="password"
                name="password"
                className={`w-[590px] h-[56px] border rounded px-3 ${
                  passwordError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type="password"
                autoComplete="off"
                placeholder=" 비밀번호 입력"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="text-red-500 text-sm min-h-[20px] mt-1">{passwordError}</p>
            </div>
            <div>
              <span className="text-[#999ea1] text-[14px]">
                ※ 영문 대/소문자, 숫자, 특수문자(~!@#$%^*+=-_만 허용)를 조합해서 입력해 주세요.(8~20자)
              </span>
            </div>
          </div>
          <div className="flex-auto ml-[3%]">
            비밀번호 확인
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                className={`w-[590px] h-[56px] border rounded px-3 ${
                  confirmPasswordError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type="password"
                autoComplete="off"
                placeholder=" 비밀번호 다시 입력"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <p className="text-red-500 text-sm min-h-[20px] mt-1">{confirmPasswordError}</p>
            </div>
          </div>
        </div>
        <div className="third-line flex flex-col space-y-4 ">
          <div className="flex items-center space-x-4 gap-x-5">
            <div className="flex-1">
              이메일
              <div className="flex space-x-2 ">
                <input
                  className="email-box flex-1 w-[204px] h-[56px] border border-gray-300 rounded px-3"
                  type="text"
                  autoComplete="off"
                  placeholder=" 이메일 입력"
                  value={emailUser}
                  onChange={handleEmailChange}
                />
                <div className="h-[56px] flex items-center justify-center text-gray-500">@</div>
                <input
                  className="flex-1 w-[150px] h-[56px] border border-gray-300 rounded px-3"
                  type="text"
                  autoComplete="off"
                  placeholder=" 직접 입력"
                  value={customDomain || emailDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  disabled={emailDomain !== ''}
                />
                <select
                  className="select-box flex-1 w-[150px] h-[56px] border border-gray-300 rounded px-3"
                  value={emailDomain || 'custom'}
                  onChange={handleDomainChange}
                >
                  <option value="">선택</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="kakao.com">kakao.com</option>
                  <option value="custom">직접 입력</option>
                </select>
              </div>
            </div>
            <div className="flex-1 ">
              휴대폰번호
              <input
                className={`w-[590px] h-[56px] border rounded px-3 ${
                  phoneError ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                type="text"
                placeholder=" 휴대폰번호"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
          </div>
        </div>
      </form>

      <div className="rounded-lg border border-gray-300 w-[1243px] mt-[5%]">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="bg-gray-100 font-[SpoqaHanSansNeo-Bold] p-4 rounded-t-lg">약관 동의</td>
            </tr>
            {[
              { id: 'terms', label: '이용약관 동의(필수)' },
              { id: 'privacy', label: '개인정보 수집 및 이용 동의(필수)' },
              { id: 'refund', label: '환불약관 동의(필수)' },
              { id: 'marketing', label: '맞춤 서비스 제공 등 혜택/정보 수신 동의(선택)' },
              { id: 'sms', label: 'SMS' },
            ].map(({ id, label }) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="p-4">
                  <div className="flex items-center cursor-pointer">
                    <span
                      tabIndex={0}
                      className="text-2xl"
                      onClick={() => toggleCheckbox(id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleCheckbox(id);
                        }
                      }}
                      role="checkbox"
                      aria-checked={agreements[id]}
                    >
                      <RiCheckboxCircleLine
                        className={`text-[24px] ${agreements[id] ? 'text-[#b70f28]' : 'text-gray-300'}`}
                      />
                    </span>
                    <label htmlFor={`agree-${id}`} className="pl-2">
                      {label}
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-[3%] mb-[7%]">
        <button
          className={`w-[400px] h-[56px] rounded-md text-white ${
            isRequiredAgreementsChecked ? 'bg-[#b70f28]' : 'bg-gray-400'
          }`}
          type="button"
          disabled={!isRequiredAgreementsChecked}
          onClick={handleSignup}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
