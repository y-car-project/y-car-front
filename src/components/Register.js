import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, InputNumber, Select, Input, message } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register({ visible, onClose, onRegisterSuccess }) {
  const [form] = Form.useForm();
  const [carOptions, setCarOptions] = useState([]);
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (visible) {
      if (!sessionStorage.getItem('Authorization')) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
      }
      fetch('http://localhost:8080/getAllCarList')
        .then((res) => res.json())
        .then((data) => {
          const options = data.map((car) => ({
            value: car.car_name,
            label: car.car_name,
            car_img: car.car_img,
          }));
          setCarOptions(options);
        })
        .catch((err) => {
          console.error('차량 목록 불러오기 실패:', err);
          messageApi.error('차량 목록을 가져오는데 실패했습니다.');
        });
    }
  }, [visible]);

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleOk = async () => {
    if (!captchaToken) {
      messageApi.error('reCAPTCHA를 통과해주세요.');
      return;
    }
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('car_name', values.car_name);
      formData.append('car_price', values.car_price);
      formData.append('car_year', values.car_year);
      formData.append('car_km', values.car_km);
      formData.append('car_fuel', values.car_fuel);
      const selectedOption = carOptions.find((option) => option.value === values.car_name);
      if (selectedOption && selectedOption.car_img) {
        formData.append('car_img', selectedOption.car_img);
      }
      const response = await fetch('http://localhost:8080/insertCar', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        messageApi.success('차량 등록 성공');
        form.resetFields();
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaToken(null);
        if (onRegisterSuccess) {
          onRegisterSuccess();
          console.log('success 전송');
        }
        onClose();
      } else {
        messageApi.error('차량 등록 실패');
      }
    } catch (error) {
      console.error(error);
      messageApi.error('입력한 정보를 확인해주세요.');
    }
  };

  const formatPrice = (value) => {
    if (!value && value !== 0) return '';
    const num = Number(value);
    if (num < 10000) return `${num}만원`;
    const uk = Math.floor(num / 10000);
    const man = num % 10000;
    return man > 0 ? `${uk}억 ${man}만원` : `${uk}억`;
  };

  const parsePrice = (value) => {
    if (!value) return '';
    if (value.includes('억')) {
      const parts = value.split('억');
      const uk = Number(parts[0].trim()) || 0;
      const remainderStr = parts[1].replace('만원', '').trim();
      const remainder = Number(remainderStr) || 0;
      return uk * 10000 + remainder;
    }
    return Number(value.replace(/[^\d]/g, '')) || 0;
  };

  const handleCancel = () => {
    form.resetFields();
    setCaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="차량 등록"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="등록"
        cancelText="취소"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="차량 이름"
            name="car_name"
            rules={[{ required: true, message: '차량 이름을 선택해주세요' }]}
          >
            <Select placeholder="차량 이름 선택" options={carOptions} />
          </Form.Item>
          <Form.Item
            label="차량 가격"
            name="car_price"
            rules={[{ required: true, message: '차량 가격을 입력해주세요' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="차량 가격"
              formatter={formatPrice}
              parser={parsePrice}
            />
          </Form.Item>
          <Form.Item
            label="차량 연식 (YYMM)"
            name="car_year"
            rules={[
              { required: true, message: '차량 연식을 입력해주세요' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (!/^\d{4}$/.test(value)) {
                    return Promise.reject(new Error('연식은 4자리 숫자 (YYMM)로 입력해주세요'));
                  }
                  const inputYear = parseInt(value.slice(0, 2), 10);
                  const inputMonth = parseInt(value.slice(2, 4), 10);
                  if (inputMonth < 1 || inputMonth > 12) {
                    return Promise.reject(new Error('월은 01부터 12까지 입력 가능합니다'));
                  }
                  const now = new Date();
                  const currentYear = now.getFullYear() % 100;
                  const currentMonth = now.getMonth() + 1;
                  if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth)) {
                    return Promise.reject(new Error('입력한 연식은 현재보다 미래입니다'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input maxLength={4} placeholder="예: 2105 (21년 5월)" />
          </Form.Item>
          <Form.Item label="주행거리" name="car_km" rules={[{ required: true, message: '주행거리를 입력해주세요' }]}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="주행거리"
              formatter={(value) => `${value}km`}
              parser={(value) => value.replace('km', '')}
            />
          </Form.Item>
          <Form.Item label="유종" name="car_fuel" rules={[{ required: true, message: '유종을 선택해주세요' }]}>
            <Select
              placeholder="유종 선택"
              options={[
                { value: '가솔린', label: '가솔린' },
                { value: '디젤', label: '디젤' },
                { value: 'LPG', label: 'LPG' },
                { value: '가솔린+전기', label: '가솔린+전기' },
                { value: '전기', label: '전기' },
              ]}
            />
          </Form.Item>
        </Form>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      </Modal>
    </>
  );
}
