import React,{useState, useEffect, useContext} from 'react'
import { RiGpsFill } from "react-icons/ri";
import { TiBatteryCharge } from "react-icons/ti";
import './Notification.scss'
import { GiPositionMarker } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";   
import ModalAddDevice from './settingDevice/AddDevice';
import { MdDirectionsRun } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaConnectdevelop } from "react-icons/fa";
import { FiWifi } from "react-icons/fi";
import { FiWifiOff } from "react-icons/fi";
import { MdBrowserUpdated } from "react-icons/md";     
import { PiBatteryWarningFill } from "react-icons/pi";
import axios from 'axios';
import { url } from './services/UserService';
import { UserContext } from './usercontext';                 
import { GrUpdate } from "react-icons/gr";

import { MdError } from "react-icons/md";
function Notification() {  
  
  const [isLoading, setIsLoading] = useState(true); // Thêm state để quản lý trạng thái loading

  const [listNotifications, setListNotifications] = useState([]);
  const [phone, setPhone] = useState('');
  const [showModalAddDevice, setshowModalAddDevice] = useState(false);
  const handleshowModalAddDevice = ()=> {   
        setshowModalAddDevice(true)       
  }
  const handleCloseModalAddDeice = ()=>{
        setshowModalAddDevice(false)     
  } 

  const getNotification = async () => {
    setIsLoading(true); // Bắt đầu loading
    let success = false;  
    while (!success) {   
      try {
        const response = await axios.get(`${url}/Notification/GetNotificationByPhoneNumber?phoneNumber=${phone}`);   
        const NotificationsData = response.data;
  
        // Kiểm tra nếu dữ liệu nhận được hợp lệ
        if (NotificationsData) {    
          // const ListStolen = LoggerData.filter((item) => item.stolenLines.length > 0);
          const sortedData = NotificationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setListNotifications(sortedData);    
          console.log(sortedData);   
          success = true; // Dừng vòng lặp khi dữ liệu hợp lệ và được xử lý
        } else {
          alert('ReLoad');
        }
      } catch (error) {
        console.error('getNotification error, retrying...', error);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
      }
    }
    setIsLoading(false); // Kết thúc loading sau khi lấy dữ liệu xong
  };


  const postDataToAPI = async (url, data) => {
    try {
      const response = await axios.post(`${url}/Notification/GetNotificationByPhoneNumber?phoneNumber=${phone}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data);
      return response.data; // Trả về dữ liệu từ server nếu cần dùng tiếp
    } catch (error) {
      console.error('POST request failed:', error);
      return null; // Trả về null nếu lỗi
    }
  };

  useEffect(() => {  
    const phoneNumer = sessionStorage.getItem('phoneNumer');    
    setPhone(phoneNumer)    
  }, [])
  
  useEffect(() => { 
    if(phone !== ''){
      getNotification();
    }                     
  }, [phone])

  function convertDateTimeBefore(inputString) {
    const [date, time] = inputString.split('T');    
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year} ${time}`;    
  }

  const iconMap = {
    "Pin yếu": <PiBatteryWarningFill className='iconDevice' />,
    "Cảnh báo chuyển động": <MdDirectionsRun className='iconDevice' />,
    "Vùng an toàn": <IoIosWarning className='iconDevice' />, // Thêm icon khác
    "Cập nhật vị trí": <GrUpdate className='iconDevice' />, // Thêm icon khác
  }

  return (
    <div className='fatherNotification'>
      <div className='wrapperNotification'>
            <div className='TitleNotification'>
                    <div className='TitleNotificationItem'>
                          Thông báo
                    </div> 
            </div>

            {
              isLoading ? (
                    <div className="loadingContainer">
                            <div className="spinner"></div> {/* Hiển thị hiệu ứng loading */}
                            <p>Đang tải thông báo...</p>
                    </div>
              ) :
              
              (listNotifications.map((item , index) => (
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                              {iconMap[item.title] || <MdError className='iconDevice' />}                      
                      </div>    
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                            {item.title}  
                          </div>
                          <div className='divIconPin'>  
                            <div>{item.description}</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                              {convertDateTimeBefore(item.timestamp)}
                          </div>
                          <div className = 'itemNotificationecondItem'>                            
                              <FaCircle className='iconAcknownledge' />
                          </div>              
                  </div>

                </div>
              </div>                              
              ))  )}
      </div>   
              
    </div>
  )
}

export default Notification
