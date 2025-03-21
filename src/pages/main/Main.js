/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSearchOutline } from 'react-icons/io5';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CountdownTimer from '../../components/CountDownTimer';
import Register from '../../components/Register';

function Main() {
  const [cars, setCars] = useState([]);
  const [searchCar, setSearchCar] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchCars = () => {
    axios
      .get('http://localhost:8080/getAllUsedCars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const onChange = (e) => {
    setSearchCar(e.target.value);
  };

  function handleSearch() {
    const searchText = searchCar.toLowerCase();
    const filteredItems = cars.filter((car) => car.car_name.toLowerCase().includes(searchText));
    setFilteredCars(filteredItems);
  }

  const displayedCars = filteredCars.length > 0 ? filteredCars : cars;

  return (
    <div>
      <Header />
      <MainBanner />
      <MainMenu onRegisterSuccess={fetchCars} />
      <WeeklyCars />
      <div className="bg-[#f6f8fa] py-[80px] my-[70px]">
        <div className="justify-items-center max-w-[1260px] m-auto">
          <h2 className="mb-[35px] text-[33px] font-[SpoqaHanSansNeo-Medium]">어떤 차를 찾으세요?</h2>
          <div className="relative">
            <button type="button" className="absolute right-[13px] bottom-[13px]" onClick={handleSearch}>
              <IoSearchOutline className=" size-[25px] text-gray-500" />
            </button>
            <input
              className="font-[SpoqaHanSansNeo-Thin] w-[510px] h-[50px] border-b-4 border-black pl-[20px] pr-[50px] bg-transparent"
              placeholder="모델명을 입력해주세요. 예) K5"
              onChange={onChange}
              value={searchCar}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex mt-[20px] gap-[20px]">
            <button
              className="font-[SpoqaHanSansNeo-Regular] bg-white px-[20px] text-[14px] h-[36px] rounded-[50px]"
              type="button"
            >
              #더 뉴 그랜저
            </button>
            <button
              className="font-[SpoqaHanSansNeo-Regular] bg-white px-[20px] text-[14px] h-[36px] rounded-[50px]"
              type="button"
            >
              #G80(RG3)
            </button>
            <button
              className="font-[SpoqaHanSansNeo-Regular] bg-white px-[20px] text-[14px] h-[36px] rounded-[50px]"
              type="button"
            >
              #그랜저 IG
            </button>
            <button
              className="font-[SpoqaHanSansNeo-Regular] bg-white px-[20px] text-[14px] h-[36px] rounded-[50px]"
              type="button"
            >
              #GV80
            </button>
            <button
              className="font-[SpoqaHanSansNeo-Regular] bg-white px-[20px] text-[14px] h-[36px] rounded-[50px]"
              type="button"
            >
              #5시리즈(G30)
            </button>
          </div>
        </div>
      </div>
      <div className="mb-[100px] flex flex-wrap m-auto gap-[20px] justify-center font-[SpoqaHanSansNeo-Light] max-w-[1260px]">
        {displayedCars.map((car) => (
          <div key={car.car_code} className="w-[380px] m-3">
            <img src={car.car_img} className="h-[252px] object-cover rounded-[8px]" alt="carImage" />
            <div className="p-[16px] flex flex-col gap-[15px]">
              <p className="text-[22px] h-[56px]">{car.car_name}</p>
              <p className="text-[22px] font-[SpoqaHanSansNeo-Medium]">{car.car_price.toLocaleString()}만원</p>
              <div className="flex gap-3">
                <p className="rounded-md px-2 bg-[#E2E8EE]">{`${String(car.car_year).slice(0, 2)}년 ${String(car.car_year).slice(2)}월`}</p>
                <p className="rounded-md px-2 bg-[#E2E8EE]">{car.car_km.toLocaleString()}km</p>
                <p className="rounded-md px-2 bg-[#E2E8EE]">{car.car_fuel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Main;

function MainBanner() {
  return (
    <div>
      <Swiper
        className="max-w-[1260px]"
        pagination={{ type: 'fraction' }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/banner1.png`} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/banner2.jpg`} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/banner3.jpg`} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/banner4.png`} alt="banner" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function MainMenu({ onRegisterSuccess }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className="max-w-[1260px] flex justify-between m-auto py-[40px]">
      <div className="flex gap-[30px] justify-center w-[410px] h-[140px] p-[20px 40px] rounded-[8px] align-items-center shadow-custom justify-center items-center">
        <div className="flex flex-col gap-[7px]">
          <div className="text-[20px] font-[SpoqaHanSansNeo-Medium]">왜 Y Car를 선택할까요?</div>
          <div className="flex gap-[8px]">
            <span className="text-[13px] rounded-sm px-2 bg-[#E2E8EE]">#직영</span>
            <span className="text-[13px] rounded-sm px-2 bg-[#E2E8EE]">#온라인</span>
            <span className="text-[13px] rounded-sm px-2 bg-[#E2E8EE]">#품질점검</span>
          </div>
        </div>
        <img
          className="w-[100px] h-[100px] rounded-[50%]"
          src={`${process.env.PUBLIC_URL}/images/img-bg1.png`}
          alt="ycar"
        />
      </div>
      <div className="flex gap-[48px]">
        <div>
          <button type="button" onClick={openModal} className="flex flex-col items-center">
            <div className="rounded-[32px] bg-[#f6f8fa] w-[112px] h-[112px] flex items-center justify-center">
              <img className="w-[56px]" src={`${process.env.PUBLIC_URL}/images/icon-warranty.png`} alt="ycar" />
            </div>
            <div className="font-[SpoqaHanSansNeo-Regular] text-[14px] mt-[12px]">내차팔기 홈서비스</div>
          </button>
          <Register visible={modalVisible} onClose={closeModal} onRegisterSuccess={onRegisterSuccess} />
        </div>
        <button type="button">
          <div className="rounded-[32px] bg-[#f6f8fa] w-[112px] h-[112px] justify-items-center content-center">
            <img className="w-[56px]" src={`${process.env.PUBLIC_URL}/images/icon-warranty2.png`} alt="ycar" />
          </div>
          <div className="font-[SpoqaHanSansNeo-Regular] text-[14px] mt-[12px]">내차사기 홈서비스</div>
        </button>
        <button type="button">
          <div className="rounded-[32px] bg-[#f6f8fa] w-[112px] h-[112px] justify-items-center content-center">
            <img className="w-[56px]" src={`${process.env.PUBLIC_URL}/images/icon-warranty3.png`} alt="ycar" />
          </div>
          <div className="font-[SpoqaHanSansNeo-Regular] text-[14px] mt-[12px]">Y Car 보증</div>
        </button>
        <button type="button">
          <div className="rounded-[32px] bg-[#f6f8fa] w-[112px] h-[112px] justify-items-center content-center">
            <img className="w-[56px]" src={`${process.env.PUBLIC_URL}/images/icon-warranty4.png`} alt="ycar" />
          </div>
          <div className="font-[SpoqaHanSansNeo-Regular] text-[14px] mt-[12px]">3D 라이브 뷰</div>
        </button>
        <button type="button">
          <div className="rounded-[32px] bg-[#f6f8fa] w-[112px] h-[112px] justify-items-center content-center">
            <img className="w-[56px]" src={`${process.env.PUBLIC_URL}/images/icon-warranty5.png`} alt="ycar" />
          </div>
          <div className="font-[SpoqaHanSansNeo-Regular] text-[14px] mt-[12px]">테마 기획전</div>
        </button>
      </div>
    </div>
  );
}
function WeeklyCars() {
  const [weekly, setWeekly] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/getWeeklyCars')
      .then((response) => {
        setWeekly(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div
      className="h-[950px] justify-items-center content-center"
      style={{ backgroundImage: "url('/images/bg-weekly.png')" }}
    >
      <div className="text-[32px] text-white font-[SpoqaHanSansNeo-Medium]">위클리 특가</div>
      <div className="font-[SpoqaHanSansNeo-Regular] text-white text-[18px]">
        매주 터지는 최대 할인가를 놓치지 마세요!
      </div>
      <div
        style={{ backgroundImage: "url('/images/weekly-time-bg.png')" }}
        className="w-[820px] text-white h-[170px] bg-no-repeat bg-cover relative"
      >
        <CountdownTimer initialMinutes={25} initialSeconds={12} />
      </div>
      <div className="justify-items-center flex flex-wrap m-auto gap-[20px] font-[SpoqaHanSansNeo-Light] max-w-[1260px]">
        {weekly.map((car) => (
          <div key={car.car_code} className="w-[380px] h-[480px] m-3 bg-white rounded-[8px]">
            <img src={car.car_img} className="h-[252px] object-cover rounded-[8px]" alt="carImage" />
            <div className="p-[30px] flex flex-col gap-[15px]">
              <p className="text-[22px] h-[56px]">{car.car_name}</p>
              <div>
                <p className="text-[18px] font-[SpoqaHanSansNeo-Thin] text-[#999ea1] line-through">
                  {car.car_price.toLocaleString()}만원
                </p>
                <p className="text-[35px] text-[#b70f28] font-[SpoqaHanSansNeo-Medium]">
                  {(car.car_price * 0.9).toLocaleString()}만원
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
