import React from 'react';
export default function Warning(props) {
      const { text, icon, bgColor, textColor, borColor } = props;
      return (
            <>
                  <div
                        className={`mb-[15px] + ${bgColor} border + ${borColor} flex justify-start py-[10px] pl-[10px] rounded`}
                  >
                        <div className="mr-[5px] mt-[3px]">{icon}</div>
                        <div className={`text-[14px] + ${textColor}`}>{text}</div>
                  </div>
            </>
      );
}
