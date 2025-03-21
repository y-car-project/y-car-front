import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    flow: 'auth-code', // authorization code flow 사용
    onSuccess: async (response) => {
      // response에 code 값이 있어야 합니다.
      const { code } = response;
      try {
        const { data } = await axios.post('http://localhost:8080/googleLogin', { code });
        console.log('Google login successful:', data);
        sessionStorage.setItem('Authorization', data.accessToken);
        sessionStorage.setItem('email', data.email);
        alert('로그인 성공!');
        navigate('/main');
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      login();
    }
  };

  return (
    <img
      role="presentation"
      className="w-auto h-[56px]"
      src={`${process.env.PUBLIC_URL}/images/icon-login-google.svg`}
      alt="Google 로그인"
      onClick={login}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default GoogleLoginButton;
