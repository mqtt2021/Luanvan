import React, { useEffect, useState,useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../services/UserService';
import {  toast } from 'react-toastify';
import { HiOutlinePhotograph } from "react-icons/hi";
import './AddDevice.scss'
import { MdPhotoCamera } from "react-icons/md";
import axios from 'axios';
import { url } from '../services/UserService'
function ModalAddDevice({ show , handleClose}) {   

  const [fileName, setFileName] = useState("");
  const [idDevice,setidDevice]=useState('')   
  const [nameDevice,setnameDevice]=useState('')
  const [newDevice, setnewDevice] = useState({id:''})   
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading    
  const [listAllDevices, setlistAllDevices] = useState([]) 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    startPosition.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;
    const newX = event.clientX - startPosition.current.x;
    const newY = event.clientY - startPosition.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handlePostAddDevice = async () => {   
    try {
      const response = await axios.patch(`${url}/GPSDevice/UpdateGPSDeviceStatus?GPSDeviceId=${idDevice}` , newDevice);   
      console.log(response)       
         
      if(response.data === 'Update successful!'){

              sessionStorage.setItem('idDevice', idDevice);     
              toast.success('Thêm thiết bị thành công')     
              setidDevice('')
              setnameDevice('')
              handleClose()             
      }
      else{
        toast.error('Thêm thiết bị không thành công')   
      }                                                                                 
       
    } catch (error) {                          
      toast.error('Đăng kí không thành công')
    }                            
  };

  const handleAddDevice = () => {
        if(idDevice === '' || nameDevice === ''){
          toast.error('Bạn chưa nhập đủ thông tin')  
          return  
        }
        
              if(listAllDevices.length > 0){
                   
                   const checkid = listAllDevices.find((item) => item.id === idDevice && item.customerPhoneNumber !== 'NSX');
                   console.log('checkid', checkid)   

                   if(checkid){
                     toast.error('Id thiết bị đã tồn tại')  
                     return
                   }

                   const checkidValid = listAllDevices.find((item) => item.id === idDevice);
                  

                   if(checkidValid){
                   }
                   else{
                    toast.error('Bạn đã nhập sai ID thiết bị')  
                    return
                   }

                  


                  //  const checkName = listAllDevices.find((item) => item.name === nameDevice);

                  //  if(checkName){  
                  //    toast.error('Tên thiết bị đã tồn tại')  
                  //    return
                  //  } 
              }


              const phoneNumer = sessionStorage.getItem('phoneNumer');
    
        setnewDevice({

          id: idDevice,
          customerPhoneNumber: phoneNumer,   
          longitude: 0,
          latitude: 0,
          name: nameDevice,
          imagePath: "",
          battery: 28,
          temperature: 0,
          stolen: false,
          bluetooth: "False",
          timeStamp: "2025-02-23T22:30:25",
          smsNumber: "",
          package: "",
          registationDate: "0001-01-01T00:00:00",
          expirationDate: "0001-01-01T00:00:00"
        })

        
  }
  
      const getAllDevices = async () => {   
        let success = false;
        while (!success) {
          try {
            const response = await axios.get(`${url}/GPSDevice/GetAllGPSDevices`);  
            const LoggerData = response.data;
            // Kiểm tra nếu dữ liệu nhận được hợp lệ
            if (LoggerData && LoggerData.length > 0) {
              setlistAllDevices(LoggerData);        
              success = true; 
            } else {
    
            }
          } catch (error) {
            console.error('getAllDevices error, retrying...', error);  
            await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
          }
        }
      };

      useEffect(() => {
        if(newDevice.id !== ''){
          handlePostAddDevice()
        }  
      },[newDevice]) 

      useEffect(() => {
        getAllDevices()
      },[])
      
      
      console.log('newDevice',  newDevice)   

  return (
    <div  className="modal show"
      style={{ display: 'block', position: 'initial', zIndex:1000 }}>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>   
          <Modal.Title>Thêm thiết bị</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
        <form>
            <div className="form-group">
             <div className='SettingFirst'>
                                                        <div className="Wrapimage">
                                                        <div
                                                            className="image-container"
                                                            onMouseMove={handleMouseMove}
                                                            onMouseUp={handleMouseUp}
                                                            onMouseLeave={handleMouseUp}
                                                          >
                                                            {image && (
                                                              <img
                                                                src={image}
                                                                alt="Uploaded"
                                                                style={{
                                                                  transform: `translate(${position.x}px, ${position.y}px)`,
                                                                }}
                                                                onMouseDown={handleMouseDown}
                                                              />
                                                            )}
                                      
                                                            
                                                          </div>
                                                          <div
                                                              className='buttonUpload'
                                                              onClick={() => document.getElementById("fileInput").click()}
                                                            >
                                                              <MdPhotoCamera className='IconButtonUpload'/>
                                                            </div>   
                                                        </div>
                                                          
                                                          <input
                                                            type="file"
                                                            id="fileInput"
                                                            style={{ display: "none" }}
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                          />
                                      
                                                          
                                                          
                                                      </div>
            </div>

            <div className="form-group">
              <label for="exampleInputJob">Tên thiết bị</label>
              <input 
                      type="text" className="form-control" id="exampleInputJob"   
                      value={nameDevice}
                      onChange={(e)=>setnameDevice(e.target.value)}

              />
            </div>

            <div className="form-group">
              <label for="exampleInputJob">ID thiết bị</label>
              <input 
                    type="text" className="form-control" id="exampleInputJob"   
                    value={idDevice}
                    onChange={(e)=>setidDevice(e.target.value)}
              />
            </div>
            
        </form>
        </Modal.Body>   
        <Modal.Footer>  
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" 
                onClick={handleAddDevice}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  )
}

  
export default ModalAddDevice        
