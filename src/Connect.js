import React, { useEffect, useState,useRef, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  toast } from 'react-toastify';
import { HiOutlinePhotograph } from "react-icons/hi";
import './Connect.scss'
import { MdPhotoCamera } from "react-icons/md";
import axios from 'axios';
import { url } from './services/UserService';
import { UserContext } from './usercontext';
function Connect({ show , handleClose }) {          
  const { idObjectConnect, setidObjectConnect } = useContext(UserContext);  
  const [fileName, setFileName] = useState("");
  
  const [ObjectConnect, setObjectConnect] = useState({id:''})   
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

  const CallAPIGetObjectById = async () => {      
    let success = false;  
    while (!success) {
      try {
        
        const response = await axios.get(`${url}/GPSObject/GetObjectById?id=${idObjectConnect}`);       
        const LoggerData = response.data;
  
        // Kiểm tra nếu dữ liệu nhận được hợp lệ
        if (LoggerData) {
          
          setObjectConnect(LoggerData)

          success = true; // Dừng vòng lặp khi dữ liệu hợp lệ và được xử lý
          
        } else {
          
          alert('ReLoad');
        }
      } catch (error) {
        console.error('CallAPIGetObjectById, retrying...', error);    
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
      }
    }
  };

  const handlePostAddDevice = async () => {   
    try {
      const response = await axios.patch(`${url}/GPSDevice/CreateNewGPSDevice` , {
        phoneNumber: "string",
        deviceId: "string",
        objectId: "string"
      });
      console.log(response)  
         
      if(response.data === true){
              toast.success('Thêm thiết bị thành công')
            
              handleClose()             
      }
      else{
        toast.error('Thêm thiết bị không thành công')
      }
       
    } catch (error) {
      toast.error('Đăng kí không thành công')
    }


  };

     const handleConnectObjectWithDevice = () => {
       
        
              // if(listAllDevices.length > 0){
              //      const checkid = listAllDevices.find((item) => item.id === idDevice);
              //      if(checkid){
              //        toast.error('Id thiết bị đã tồn tại')  
              //        return
              //      }
              //      const checkName = listAllDevices.find((item) => item.name === nameDevice);
              //      if(checkName){  
              //        toast.error('Tên thiết bị đã tồn tại')  
              //        return
              //      } 
              // }
      
      }
  
      const getAllDevices = async () => {   
        let success = false;
        while (!success) {
          try {
            const response = await axios.get(`${url}/GPSDevice/GetAllGPSDevices`);  
            const LoggerData = response.data;
      
            // Kiểm tra nếu dữ liệu nhận được hợp lệ
            if (LoggerData && LoggerData.length > 0) {
    
              const phoneNumer = sessionStorage.getItem('phoneNumer');
              const listDevice = LoggerData.filter((item) => item.customerPhoneNumber === phoneNumer);
              setlistAllDevices(listDevice);      
         
             
      
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
        if(show){     
          console.log('cccccc')                              
          CallAPIGetObjectById()    
        }    
      },[show]) 

      useEffect(() => {
        getAllDevices()
      },[])  

    
console.log('idObjectConnect', idObjectConnect)  
      
  return (   
    <div  className="modal show"
      style={{ display: 'block', position: 'initial', zIndex:1000 }}>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>   
          <Modal.Title>{`Kết nối đối tượng ${ObjectConnect.name}`}</Modal.Title>
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
              <label for="exampleInputJob">Thiết bị kết nối</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>

                {listAllDevices.map((item , index) => (    
                      <option value={index}>{item.name}</option>
                ))}

              </select>
            </div>

           
            
        </form>
        </Modal.Body>   
        <Modal.Footer>  
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" 
                onClick={handleConnectObjectWithDevice}
          >
            Kết nối
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  )
}

  
export default Connect        
