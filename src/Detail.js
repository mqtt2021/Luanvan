import React,{useState} from 'react'
import DatePicker from 'react-datepicker';
import './Detail.scss'
import Table from 'react-bootstrap/Table';
import ModalUpdateFirmware from './settingDevice/Firmware';
import {Link, useNavigate} from "react-router-dom";
import imgObject from './asset/images/Device.jpg'
import { FaFile } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import { IoIosTime } from "react-icons/io";
import { PiBatteryWarningFill } from "react-icons/pi";
import { FaFileArchive } from "react-icons/fa";
function Detail() {        

    const [selectedOption, setSelectedOption] = useState('');
    const [valueFrom, onChangeFrom] = useState(new Date());    
    const [valueTo, onChangeTo] = useState(new Date());
    const [showModalUpdateFirmware, setshowModalUpdateFỉmware] = useState(false);

    const data = [
      { time: '04/01/2025 01:00:00', pin: 45 },
      { time: '04/01/2025 01:00:00', pin: 30 },
      { time: '04/01/2025 01:00:00', pin: 22 },
    ];  


    const handleshowModalUpdateFirmware= ()=> {   
      setshowModalUpdateFỉmware(true)     
      }
    const handleCloseModalUpdateFirmware=()=>{
      setshowModalUpdateFỉmware(false)   
    }  

    const [fileName, setFileName] = useState("");
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFileName(file.name);
        } else {
          setFileName("");
        }
      };
  
  return (
    <div className='fatherInforObject'>
      <div className='wrapperInforObject'>

                          <div className='InforObjectTitle'>
                              <div className='InforObjectTitleItem'>
                                  Thông tin thiết bị
                              </div> 
                          </div>
                          <div className='imgObject'>
                            <img src={imgObject} alt=''/>  
                          </div>
                <div
                  className='wrapinformationDevice' 
                >   
                          
                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>
                                  <MdDriveFileRenameOutline className='informationDeviceItemIcon'/>
                              </div>  
                              <div className='informationDeviceItemFirstTitle'>Tên thiết bị:</div>
                          </div> 
                          
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                      PT1006
                                </div>                                
                          </div>

                        </div>
                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>   
                                  <HiIdentification className='informationDeviceItemIcon'/>
                              </div>  
                              <div className='informationDeviceItemFirstTitle'>Mã ID:</div>
                          </div> 
                          
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                      GP0001
                                </div>                                
                          </div>

                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>
                                  <IoIosTime className='informationDeviceItemIcon'/>  
                              </div>  
                              <div className='informationDeviceItemFirstTitle'>Thời gian cập nhật lần cuối:</div>
                          </div> 
                            
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                      23:45:30 12/12/2024
                                </div>                                
                          </div>

                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>
                                  <PiBatteryWarningFill className='informationDeviceItemIcon'/>  
                              </div>     
                              <div className='informationDeviceItemFirstTitle'>Mức pin cảnh báo:</div>
                          </div> 
                            
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                      10%
                                </div>                                
                          </div>
                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>
                                  <FaFileArchive className='informationDeviceItemIcon'/>    
                              </div>       
                              <div className='informationDeviceItemFirstTitle'>Cập nhật Firmware:</div>
                          </div> 
                            
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                      10%
                                </div>                                
                          </div>
                        </div>

                        <Link to="/EditInforObject">   
                          <div className='divButtonEdit'>
                            <button className='buttonEdit'>Chỉnh sửa</button>
                          </div>
                        </Link>

                </div>
               
                
          
      </div>
      
    </div>
  )
}

export default Detail
