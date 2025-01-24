import React,{useState} from 'react'
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
function Notification() {   

  const [showModalAddDevice, setshowModalAddDevice] = useState(false);
  const handleshowModalAddDevice = ()=> {   
        setshowModalAddDevice(true)       
  }
  const handleCloseModalAddDeice = ()=>{
        setshowModalAddDevice(false)     
  } 

  return (
    <div className='fatherNotification'>
      <div className='wrapperNotification'>
                <div className='TitleNotification'>
                    <div className='TitleNotificationItem'>
                          Thông báo
                    </div> 
                </div>

              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <MdDirectionsRun className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                            Thiết bị di chuyển  
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 bị di chuyển</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                              24/12/2025 - 17:56:39
                          </div>
                          <div className = 'itemNotificationecondItem'>                            
                              <FaCircle className='iconAcknownledge' />
                          </div>              
                  </div>

                </div>
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <IoIosWarning className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                            Thiết bị ra khỏi vùng an toàn
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 cách điểm ban đầu 25 m</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/01/2025 - 07:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>

                </div>
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <MdBrowserUpdated className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>  
                              Cập nhật Firmware  
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 được cập nhật firmware</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/12/2025 - 17:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>
                </div>
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <IoMdSettings className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                              Thiết lập 
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 được thiết lập bán kính an toàn 15m</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/12/2025 - 17:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>
                </div>
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <FiWifi className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                              Kết nối 
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 được kết nối với DataLogger Cello</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/12/2025 - 17:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>
                </div>
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <FiWifiOff className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                              Hủy kết nối 
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 hủy kết nối với DataLogger Cello</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/12/2025 - 17:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>
                </div>   
              </div>
              <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <PiBatteryWarningFill className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                              Pin yếu 
                          </div>
                          <div className='divIconPin'>  
                            <div>Thiết bị GPS 01 có mức pin dưới 10%</div>      
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                          <div className = 'itemNotificationecondItem'>  
                           
                              24/12/2025 - 17:56:39
                            
                          </div>
                          <div className = 'itemNotificationecondItem'>  
                           
                              <FaCircle className='iconAcknownledge' />
                            
                          </div>              
                  </div>
                </div>   
              </div>
   
              {/* <div
                  className='wrapperContainerNotification'
              >        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <RiGpsFill className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                          <div className='name'>
                            GPS 02
                          </div>
                          <div className='divIconPin'>
                            <TiBatteryCharge className='iconPin'/>
                            <div>50%</div>   
                          </div>
                      </div>
                  </div>
                  <div className='itemDevice itemNotificationecond'>
                      <Link to="/map"> 
                      <div className = 'itemNotificationecondItem'>  
                        <div>
                          <GiPositionMarker className='itemNotificationecondItemIcon'/>  
                        </div>
                        <div>
                          Vị trí
                        </div>
                      </div>
                      </Link>  
                      
                      <Link to="/Notification/Setting/2">         
                        <div className = 'itemNotificationecondItem'>
                          <div>
                            <IoMdSettings className='itemNotificationecondItemIcon'/>
                          </div>
                          <div>
                            Thiết lập     
                          </div>
                        </div>
                      </Link>
                      
                      <div>

                      </div>
                  </div>
                </div>
              </div> */}
              
      </div>   
              
    </div>
  )
}

export default Notification
