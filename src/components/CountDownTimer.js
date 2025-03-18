import React, { useEffect, useState } from 'react';

export default function CountdownTimer({ initialMinutes, initialSeconds }) {
  const [time, setTime] = useState(initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 정리
  }, [time]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}일 ${hours}시간 ${minutes}분 ${secs}초`;
  };

  return (
    <div className="w-max absolute top-[53%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[20px] font-[SpoqaHanSansNeo-Regular]">
      남은시간 <span className="text-[40px] ml-[15px]"> {formatTime(time)}</span>
    </div>
  );
}
