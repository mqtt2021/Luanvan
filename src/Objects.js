import React, { useState, useEffect, useRef,useContext } from "react";
import { RiGpsFill } from "react-icons/ri";
import { TiBatteryCharge } from "react-icons/ti";
import './Objects.scss'  
import { GiPositionMarker } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import {Link,useNavigate} from "react-router-dom";
import { IoIosInformationCircle } from "react-icons/io";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { GrConnect } from "react-icons/gr";
import { RiChatHistoryFill } from "react-icons/ri";
import { url } from './services/UserService';   
import axios from 'axios';
import Connect from "./Connect";  
import { UserContext } from './usercontext';
function Object() {    
  
  const {idObjectConnect, setidObjectConnect } = useContext(UserContext); 
  const [listAllDevices,setlistAllDevices] = useState([])  
  const [showModalAddDevice, setshowModalAddDevice] = useState(false);
  

  const getAllObjectsByPhoneNumber = async () => {   
    let success = false;
    while (!success) {
      try {
        const phoneNumer = sessionStorage.getItem('phoneNumer');
        const response = await axios.get(`${url}/GPSObject/GetObjectByPhoneNumber?phoneNumber=${phoneNumer}`);  
        const LoggerData = response.data;     
        // Kiểm tra nếu dữ liệu nhận được hợp lệ
        if (LoggerData && LoggerData.length > 0) {
          setlistAllDevices(LoggerData);      
          success = true;   
        } else {
        }
      } catch (error) {
        console.error('getAllObjectsByPhoneNumber error, retrying...', error);    
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
      }
    }
  };



  useEffect(() => {  
    getAllObjectsByPhoneNumber()
  }, []); 



  const handleCloseModalAddDeice = () => {
        setshowModalAddDevice(false)  
  } 
  const handleConnectObjectDevice = (id) => { 
        setidObjectConnect(id)
        setshowModalAddDevice(true)  
  } 

  return (
    <div className='fatherObject'>
      <div className='wrapperObject'>
              <div className='AddObjectTitle'>
                  <div className='AddObjectTitleItem'>
                        Đối tượng
                  </div> 
              </div>
              <div className='toolObject'>
                  <div className='divInputFindObject'>
                        <input 
                          type="email" class="form-control" id="exampleInputEmail1" placeholder="Tìm đối tượng"
                                                  
                        />              
                  </div>   
                  <Link  to="/AddObject">                    
                    <div className='divAddObject'>
                          <IoMdAddCircle className='iconAddObject'/>    
                    </div>
                  </Link>                      
              </div>

              {listAllDevices.map((item , index)=>(
                <div className='wrapperContainerObject'>        
                <div className='containerDevice'>
                  <div className='itemDevice itemDeviceFirst'>
                      <div className='divIconDevice'>
                          <TbDeviceComputerCamera className='iconDevice'/>
                      </div>
                      <div className='divIconNameAndPin'>
                         <div className='name'>
                            {item.name}
                         </div>
                          
                      </div>
                      <div  
                            className={item.connected ? 'connected' : 'disconnected'}
                           
                      >
                              {item.connected ? 'Đã kết nối' : 'Chưa kết nối'}
                      </div>
                  </div>
                  <div className='itemDevice itemObjectecond'>
                      <Link to={`/PositionObject/${item.id}`}>     
                      <div className = 'itemObjectecondItem'>  
                        <div>
                          <RiChatHistoryFill className='itemObjectecondItemIcon'/>  
                        </div>
                        <div>
                            Lộ trình
                        </div>
                      </div>
                      </Link>    
                      
                      
                        <div 
                              className = 'itemObjectecondItem itemObjectecondItemConnect'
                              onClick={() => handleConnectObjectDevice(item.id)} // Truyền id vào hàm xử lý
                              
                        >
                          <div>
                          <GrConnect className='itemObjectecondItemIcon'   />
                          </div>
                          <div>
                            Kết nối
                          </div>
                        </div>
                       
                      
                      <Link to="/Object/Setting/:id">         
                        <div className = 'itemObjectecondItem'>
                          <div>
                            <IoIosInformationCircle className='itemObjectecondItemIcon'/>
                          </div>
                          <div>
                            Thông tin   
                          </div>
                        </div>
                      </Link>
                      
                      <div>

                      </div>
                  </div>
                </div>
              </div>
              ))}
    
              
              
      </div>  


                <Connect     
                    show={showModalAddDevice} 
                    handleClose={handleCloseModalAddDeice}
                    
                />     
    </div>
  )
}

export default Object
