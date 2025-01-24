
import React, { useEffect, useState, useContext } from 'react'
import './Header.scss'
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';    
import { IoMenu } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { FaDatabase } from "react-icons/fa";    
import { IoIosWarning } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { FaBatteryHalf } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import * as signalR from "@microsoft/signalr";
import {  toast } from 'react-toastify';
import { RiLogoutCircleRLine } from "react-icons/ri";    
import { UserContext } from './usercontext';
import { TbGps } from "react-icons/tb";
import { RiGpsFill } from "react-icons/ri";
import { TbDeviceComputerCamera } from "react-icons/tb";
import logo from './asset/images/01_logobachkhoasang.png'
import { IoMap } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { url } from './services/UserService';

function Header() {
  const location = useLocation();
  const [valueBattery, setValueBattery] = useState(50); // Giá trị mặc định là 50
      
  const { setCenter, setZoomLevel, setPercentBattery, 
          setGetPositionUser, setMakerOpenPopup, 
          setPressPositionWarning, changeNameFromMapToHeader,
          setPressPercentBattery, getLoggerStolen, displayNav, setDisplayNav, displayRoutesTwoPoint, setDisplayRoutesTwoPoint,
          isButtonDisabled, setIsButtonDisabled,logout, user
    
        } = useContext(UserContext);

  // const url = 'https://sawacoapi.azurewebsites.net' 
  
  const [listLoggerStolen, setlistLoggerStolen] = useState([]) // danh sách Logger bị trộm ở hiện tại
  const [displayNavigation, setdisplayNavigation] = useState(false) // hiển thị thanh Nav khi ở kích thước điện thoại
  const [showTableWarning, setshowTableWarning] = useState(false) // hiển thị những địa điểm bị trộm
  const [currentRoute, setcurrentRoute] = useState('') 
  const [showPercentBattery, setshowPercentBattery] = useState(false);  // hiển thị bảng thay pin
  const navigate = useNavigate();


    // const getLogger = async () => {
    //   let success = false;
    //   while (!success) {   
    //     try {     
    //       const response = await axios.get(`${url}/GPSDevice/GetAllGPSDevices`);   
    //       const LoggerData = response.data;
    
    //       // Kiểm tra nếu dữ liệu nhận được hợp lệ
    //       if (LoggerData && LoggerData.length > 0) {
    //         const ListStolen = LoggerData.filter((item) => item.stolen === true);
    //         setlistLoggerStolen(ListStolen);
    //         success = true; // Dừng vòng lặp khi dữ liệu hợp lệ và được xử lý
    //       } else {
    //         alert('ReLoad');
    //       }
    //     } catch (error) {
    //       console.error('Get All Logger error, retrying...', error);
    //       await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
    //     }
    //   }
    // };
        
    useEffect(() => { 
      // getLogger()
    }, [changeNameFromMapToHeader])

    // useEffect( () => {
    //   let connection = new signalR.HubConnectionBuilder()   
    //       .withUrl("https://sawacoapi.azurewebsites.net/NotificationHub")   
    //       .withAutomaticReconnect()    
    //       .build();     
    //   // Bắt đầu kết nối     
    //   connection.start()   
    //       .then(() => {
    //           console.log('Kết nối thành công!');
    //       })
    //       .catch(err => {
    //           console.error('Kết nối thất bại: ', err);
    //       });
    //   // Lắng nghe sự kiện kết nối lại
    //   connection.onreconnected(connectionId => {
    //       console.log(`Kết nối lại thành công. Connection ID: ${connectionId}`);
    //   });
    //   // Lắng nghe sự kiện đang kết nối lại
    //   connection.onreconnecting(error => {
    //       console.warn('Kết nối đang được thử lại...', error);
    //   });
    //   connection.on("GetAll", data => {       
    //         getLogger()                       
    //   });                      
    // }, [] )
    

    const handleDisplayNavigation = () =>{
          setDisplayNav(pre=>!pre)
          
          if(location.pathname === '/'){
              setcurrentRoute('Map')
          }   
          else{
            setcurrentRoute('History')
          }
    }

    const handleShowTableWarning = () => {     
            setshowTableWarning( pre => !pre )  
            setcurrentRoute('Map')      
    }

    const handleMovetoWarning = (dataLoggerStolen) => {  // di chuyển đến địa điểm có trộm
      
      if(location.pathname === '/') {
        if(listLoggerStolen.length > 0){
            if(getLoggerStolen){
              setCenter({ lat: dataLoggerStolen.latitude, lng : dataLoggerStolen.longtitude })
              setZoomLevel(13)  
              setMakerOpenPopup(dataLoggerStolen)  
              setPressPositionWarning( pre => !pre )             
            }  
        }        
      }             
    }
   

    const handleShowPercentBattery = () => {   // hiển thị bảng chọn mức pin
          setshowPercentBattery(pre=>!pre)
    } 

    const handleSelectPercentBattery = () => { 
      if(location.pathname === '/') {
        setDisplayNav(false)     
        setPercentBattery(valueBattery)             
        setPressPercentBattery(pre=>!pre)   
      }      
    }
    const handleChangeBattery = (event) => {
      setValueBattery(event.target.value); // Cập nhật giá trị khi trượt
    };  

    const handleCloseNavigationMobile = () => {
      setDisplayNav(false)
    }

  const [countStationc01b, setcountStationc01b] = useState(0)
  const [countStationc02b, setcountStationc02b] = useState(0)
  
  
  useEffect(()=>{
        if(listLoggerStolen.length > 0){
          setcountStationc01b(listLoggerStolen[0].stolenLines.length)
          setcountStationc02b(listLoggerStolen[1].stolenLines.length)
        }  
  },[listLoggerStolen])


  const handleLogout = ()=>{ 
    
    sessionStorage.removeItem('idDevice')
    sessionStorage.removeItem('phoneNumer')  
    
    logout()
   
    if(user.auth){   
          toast.success('Đăng xuất thành công')
          // navigate('/login')     
         
    }
  }   
  console.log('userHeader', user)
  return (    
    <div className='header font-barlow'>                        
                          <div className='Menu' onClick={handleDisplayNavigation}>
                                <div><IoMenu/></div>                                
                                {/* {listLoggerStolen.length > 0  && <div className='amountOfWarning'>{listLoggerStolen.length}</div>} */}
                                   
                          </div> 
                          {/* <div className='MapTitle'>
                                      <div className='MapTitleItem'>
                                                Bản đồ tổng quan      
                                      </div> 
                          </div>  */}   
                          
                          <div className='logoHCMUT'>  
                              <img src={logo} alt="Example" />   
                          </div>                       
                          <div className='divNavigation'>
                                <Link to="/map">
                                  <div className='NavigationItem NavigationItemWarning '
                                        onClick={handleShowTableWarning}
                                  >                                      
                                      <div className='NavigationItemIcon'>
                                          <div><IoMap/></div>  
                                          <div className='NavigationItemIconText'>Bản đồ</div>
                                          {/* {listLoggerStolen.length > 0   && <div className='amountOfWarning'>{listLoggerStolen.length}</div>} */}
                                      </div>  
                                      <div className='NavigationItemShow divAmountOfWarning'>
                                          {showTableWarning ? <div><SlArrowUp/></div>:<div><SlArrowDown/></div>}
                                      </div>    
                                  </div> 
                                
                                </Link>   

                                  {showTableWarning && <div className='WrapPositionWarning'>

                                    {listLoggerStolen.map((item , index) => (
                                          <div  className='positionWarning'                                                
                                                onClick={() => handleMovetoWarning(item)}                                               
                                                key={index}                                                 
                                                >{item.name}                 
                                          </div>))}
                                  
                                  </div>} 
                                 

                                 <Link to="/map">
                                  <div className='NavigationItem NavigationItemBattery'
                                        onClick={handleShowPercentBattery}
                                  >
                                      <div className='NavigationItemIcon'>
                                          <div><FaBatteryHalf/></div>
                                          <div>Thay Pin</div>
                                      </div>                                                                                                      
                                  </div>
                                 </Link>    

                                  {showPercentBattery && 
                                  <div className='wrapBattery'>
                                    <div className='wrapBatteryItem'>
                                      <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          value={valueBattery}
                                          onChange={handleChangeBattery}
                                      />
                                      <div>{`< ${valueBattery}%`}</div>  
                                    </div>
                                    <div className='wrapBatteryItem' >
                                      <button 
                                          type="button" 
                                          class="btn btn-danger"
                                          onClick={handleSelectPercentBattery}
                                      >Chọn</button>
                                    </div>                                   
                                  </div>
                                   }
                                 

                                  <Link  to="/History"> 
                                      <div className='NavigationItem'                                           
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><FaHistory/></div>
                                              <div>Lộ trình</div>
                                          </div>    

                                      </div> 
                                  </Link>
                                  <Link  to="/Devices"> 
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><RiGpsFill/></div>
                                              <div>Thiết bị</div>   
                                          </div>    

                                      </div> 
                                  </Link>
                                  <Link  to="/Objects">    
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><TbDeviceComputerCamera/></div>
                                              <div>Đối tượng</div>     
                                          </div>    
     
                                      </div> 
                                  </Link>
                                  <Link  to="/Notification">      
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><IoNotifications/></div>
                                              <div>Thông báo</div>     
                                          </div>    

                                      </div> 
                                  </Link>
                                  <Link  to="/">             
                                    <div className='NavigationItem'>
                                          <div 
                                                onClick={handleLogout}
                                                className='NavigationItemIcon'
                                          >
                                                <RiLogoutCircleRLine className='iconLogout'/> Đăng xuất
                                          </div>
                                    </div>

                                  </Link>       
                                 
                          </div>

                          { displayNav &&
                            <div className='divNavigationMobile'>                                
                                  <Link to="/map">
                                      <div className={`NavigationItemWarning ${currentRoute === 'Map' ? 'NavigationItemActive' : 'NavigationItem' }`}
                                                          
   
                                            onClick={handleShowTableWarning}
                                      >                                      
                                          <div className='NavigationItemIcon'>
                                              <div><IoIosWarning/></div>
                                              <div className='NavigationItemIconText'>Bản đồ</div>
                                              {/* {listLoggerStolen.length > 0   && <div className='amountOfWarning'>{listLoggerStolen.length}</div>} */}
                                          </div>
                                          <div className='NavigationItemShow divAmountOfWarning'>
                                              {showTableWarning ? <div><SlArrowUp/></div>:<div><SlArrowDown/></div>}
                                          </div>    
                                      </div> 
                                  </Link> 

                                  {showTableWarning && listLoggerStolen.map((item , index) => (
                                    <div  className='positionWarning'
                                          key={index}
                                          onClick={() => handleMovetoWarning(item)}
                                  >{item.name}</div>
                                  ))}

                                  <Link to="/map">   
                                  <div className='NavigationItem NavigationItemBattery'
                                        onClick={handleShowPercentBattery}
                                  >
                                      <div className='NavigationItemIcon'>
                                          <div><FaBatteryHalf/></div>
                                          <div>Thay Pin</div>
                                      </div>
                                                                                                      
                                  </div>
                                 </Link>

                                  {showPercentBattery && 
                                      <div className='wrapBattery'>
                                        <div className='wrapBatteryItem'>
                                          <input
                                              type="range"
                                              min="0"
                                              max="100"
                                              value={valueBattery}
                                              onChange={handleChangeBattery}
                                          />
                                          <div>{`< ${valueBattery}%`}</div>  
                                        </div>
                                        <div className='wrapBatteryItem' >
                                          <button 
                                              type="button" 
                                              class="btn btn-danger"
                                              onClick={handleSelectPercentBattery}
                                          >Chọn</button>
                                        </div>                                   
                                      </div>
                                  }

                                  <Link  to="/History"> 
                                      <div 
                                              className={`${currentRoute === 'History' ? 'NavigationItemActive' : 'NavigationItem' }`}
                                              onClick={handleCloseNavigationMobile}
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><FaHistory/></div>
                                              <div>Lộ trình</div>
                                          </div>    

                                      </div>    
                                  </Link>  
                                  <Link  to="/Devices"> 
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><RiGpsFill/></div>
                                              <div>Thiết bị</div>   
                                          </div>    

                                      </div> 
                                  </Link>
                                  <Link  to="/Objects">    
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><TbDeviceComputerCamera/></div>
                                              <div>Đối tượng</div>     
                                          </div>    
     
                                      </div> 
                                  </Link>
                                  <Link  to="/Notification">      
                                      <div className='NavigationItem'
                                              
                                      >
                                          <div className='NavigationItemIcon'>
                                              <div><IoNotifications/></div>
                                              <div>Thông báo</div>     
                                          </div>    

                                      </div> 
                                  </Link>
                                  <Link  to="/">             
                                    <div className='NavigationItem'>
                                          <div 
                                                onClick={handleLogout}
                                                className='NavigationItemIcon'
                                          >
                                                <RiLogoutCircleRLine className='iconLogout'/> Đăng xuất
                                          </div>
                                    </div>

                                  </Link>                                                                                                                                                                   
                          </div>
                          }
                  </div>
  )
}

export default Header
