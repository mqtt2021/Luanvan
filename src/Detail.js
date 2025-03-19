import React,{useState, useEffect, useRef  } from 'react'
import DatePicker from 'react-datepicker';
import './Detail.scss'
import Table from 'react-bootstrap/Table';
import ModalUpdateFirmware from './settingDevice/Firmware';
import {Link, useNavigate} from "react-router-dom";
import imgDevice from './asset/images/Device.jpg'
import { FaFile } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import { IoIosTime } from "react-icons/io";
import { PiBatteryWarningFill } from "react-icons/pi";
import { FaFileArchive } from "react-icons/fa";
import { url } from './services/UserService';
import { useParams } from 'react-router-dom';                 
import axios from 'axios';
import { FaBluetooth } from "react-icons/fa";
import {useLocation}  from "react-router-dom";
import { LuAlarmClock } from "react-icons/lu";
import { GrConnect } from "react-icons/gr";
import { ToastContainer } from 'react-toastify';
import {  toast } from 'react-toastify';
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { AiFillWarning } from "react-icons/ai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
function Detail() {  
  
    const location = useLocation();     
    const [time, setTime] = useState("00:00:00"); // Giá trị mặc định
    const [ObjectIsConnect, setObjectIsConnect] = useState({}) ;     
    const [devices, setDevices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true); // Thêm state để quản lý trạng thái loading
    const [idDevice, setIdDevice] = useState('');
    const [phone, setPhone] = useState('');
    const [valueFrom, onChangeFrom] = useState(new Date());    
    const [valueTo, onChangeTo] = useState(new Date());
    const [showModalUpdateFirmware, setshowModalUpdateFỉmware] = useState(false);                 
    const [Device, setDevice] = useState({id:'', latitude: 0 , longitude: 0 });   
    const [listHistorBattery, setListHistorBattery] = useState([]);   
    const [isdisplayChart, setIsdisplayChart] = useState(false);   
    
    
        
     
    const getDeviceById = async () => { 
      
      setIsLoading(true); // Bắt đầu loading
      let success = false;

      while (!success) {   
        try {
          const response = await axios.get(`${url}/GPSDevice/GetGPSDeviceById?Id=${idDevice}`);         
          const DeviceData = response.data;
    
          // Kiểm tra nếu dữ liệu nhận được hợp lệ
          if (DeviceData) {    
            // const ListStolen = LoggerData.filter((item) => item.stolenLines.length > 0);
            setDevice(DeviceData); 
            console.log(DeviceData)       
            success = true; // Dừng vòng lặp khi dữ liệu hợp lệ và được xử lý
          } else {
            alert('ReLoad');
          }
        } catch (error) {
          console.error('getDeviceById error, retrying...', error);  
          await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
        }
      }

      setIsLoading(false); // Kết thúc loading sau khi lấy dữ liệu xong
    };


    const getDeviceIdFromURL = () => {
      
      const pathSegments = location.pathname.split('/'); 
      return pathSegments[3]; // "G001" ở vị trí thứ 3 trong mảng
    };


    useEffect(() => {  
      if(idDevice !== ''){
        getDeviceById()   
      }
      
    }, [idDevice]) 

    const getAllObject = async () => {   
      let success = false;
      while (!success) {
        try {
          const response = await axios.get(`${url}/GPSObject/GetObjectByPhoneNumber?phoneNumber=${phone}`);    
          const DevicesData = response.data; 
          console.log(DevicesData)   
          // Kiểm tra nếu dữ liệu nhận được hợp lệ
          if (DevicesData && DevicesData.length > 0) {      
            const Devices = DevicesData.find((item) => item.connected === true && item.gpsDeviceId === idDevice);
            setObjectIsConnect(Devices);         
            success = true; 
          } else {
          }
        } catch (error) {
          console.error('getAllDevice error, retrying...', error);  
          await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 2 giây trước khi thử lại
        }
      }
    };


    useEffect(() => {  
      if(phone !== ''){
        getAllObject()   
      }
         
    }, [phone])

    useEffect(() => {  
      if(listHistorBattery.length > 0){  
        setIsdisplayChart(true)
      }
      
    }, [listHistorBattery]) 

    
    useEffect(() => {  
        const deviceId = getDeviceIdFromURL();
        setIdDevice(deviceId)

        const phoneNumer = sessionStorage.getItem('phoneNumer');  
        setPhone(phoneNumer)
        
    }, [])   

    const handleshowModalUpdateFirmware= ()=> {   
      setshowModalUpdateFỉmware(true)     
    }

    const handleCloseModalUpdateFirmware=()=>{
      setshowModalUpdateFỉmware(false)   
    }  

    function convertDateTimeBefore(inputString) {
      const [date, time] = inputString.split('T');    
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year} ${time}`;
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


    const sortByTimestamp = (data) => {
      return data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    };


    const getHistoryBatteryDevice = async (id, startOfDay, endOfDay) => {     
      let success = false;
      while (!success) {   
        try {
          const response = await axios.get(
            `${url}/History/GetBatteryHistory/DeviceId=${id}?startDate=${startOfDay}&endDate=${endOfDay}`  
          );
          const PositionDeviceData = response.data;
    
          if (PositionDeviceData) {


             // Gọi hàm sắp xếp
            const sortedData = sortByTimestamp(PositionDeviceData);

            setListHistorBattery(sortedData); 
            console.log('PositionDeviceData', PositionDeviceData);         
            success = true;   
          } else {
            alert('ReLoad');
          }
        } catch (error) {
          console.error('getPositionDevice error, retrying...', error);     
          await new Promise(resolve => setTimeout(resolve, 1000)); 
        }
      }
    };


    
const scanBluetoothDevices = async () => {
  try {
      const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service']
      });

      console.log(device)

      if (device) {
          setDevices(prevDevices => [...prevDevices, device.name || 'Không có tên']);
      }
  } catch (error) {
      console.error('Lỗi khi quét thiết bị Bluetooth:', error);
  }
};

const handleScanAndShow = async () => {
  setIsVisible(true);
  await scanBluetoothDevices();
};

    const callAPIUpdateObjectById = async (bluetoothStatus) => {
      let success = false;
      while (!success) {   
        try {
          const response = await axios.patch(`${url}/GPSObject/UpdateObjectInformation?ObjectId=${ObjectIsConnect.id}`, 
            {
              "Longitude": ObjectIsConnect.longitude,
              "Latitude": ObjectIsConnect.latitude,
              "SafeRadius": ObjectIsConnect.safeRadius,
              "CurrentTime": "0001-01-01T00:00:00",   
              "AlarmTime": `0001-01-01T${time}`,
              "BlueTooth": bluetoothStatus,  // ✅ Nhận giá trị "ON" hoặc "OFF"
              "Emergency": true,
              "PhoneNumber": "0888927971"
            }
          );

          const ObjectData = response.data;
          if (ObjectData === 'Update successfully!') { 
            toast.success(`Bluetooth đã được ${bluetoothStatus === "ON" ? "bật" : "tắt"} thành công`);
            success = true;
          } else {  
            toast.error("Xác lập không thành công");
          }
        } catch (error) {
          console.error("Get All Logger error, retrying...", error);
          await new Promise(resolve => setTimeout(resolve, 1000)); 
        }
      }

      handleScanAndShow(); 


    };
    
    const firstRender = useRef(true); // Biến cờ để kiểm tra lần đầu render
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false; // Đánh dấu lần đầu đã render
        return; // Ngăn không chạy lần đầu
      }
  
      console.log("Đã chọn xong giờ:", time);
      // Có thể gọi API hoặc xử lý dữ liệu tại đây
    }, [time]); // Chạy khi `time` thay đổi, nhưng bỏ qua lần đầu tiên



    const formatDateTime = (date) => {
      if (!date) return "No date selected";
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

const handleShowRoute = () => { 

            const startOfDay = formatDateTime(valueFrom);
            const endOfDay = formatDateTime(valueTo);
            getHistoryBatteryDevice(idDevice, startOfDay, endOfDay);  
            if(startOfDay < endOfDay){

            }
            else{
              toast.error('Thời gian không hợp lệ')
            }                    
    }

const formattedData = listHistorBattery.map((item) => ({  
  time: moment(item.timestamp).format("HH:mm"), // Hiển thị giờ phút trên trục X
  timestamp: item.timestamp, // Giữ nguyên timestamp để hiển thị tooltip
  value: item.value,
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dateTime = moment(payload[0].payload.timestamp).format("DD/MM/YYYY HH:mm:ss");
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-md rounded">
        <p className="text-xs text-gray-700">{dateTime}</p>
        <p className="text-sm font-semibold">{`Pin: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};



return (
    <div className='fatherInforDevice'>
      <div className='wrapperInforDevice'>   

              <div className='InforDeviceTitle'>
                  <div className='InforDeviceTitleItem'>
                      Thông tin thiết bị
                  </div>  
              </div>
              <div className='imgDevice'>    
                <img src={imgDevice} alt=''/>      
              </div>

              {isVisible && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[400px] max-h-[500px] overflow-auto bg-white border rounded-2xl shadow-xl p-6 z-50">
                    <button 
                        onClick={() => setIsVisible(false)} 
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold">×
                    </button>
                    <h2 className="text-xl font-bold text-center text-gray-700 mb-4">🔍 Danh sách thiết bị Bluetooth</h2>
                    <div className="border-t mt-4 pt-3">
                        {devices.length > 0 ? (
                            <ul className="list-none space-y-2">
                                {devices.map((device, index) => (
                                    <li key={index} className="px-4 py-2 bg-gray-100 rounded-lg shadow-sm flex items-center gap-2">
                                        <span className="text-blue-500 text-lg">🔹</span>
                                        <span className="text-gray-800 font-medium">{device}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500">Chưa có thiết bị nào được tìm thấy.</p>
                        )}
                    </div>
                </div>
            )}


          {isLoading ?  (
                    <div className="loadingContainer">
                      <div className="spinner"></div> {/* Hiển thị hiệu ứng loading */}
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  ) 
              
              :

                  (
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
                                    {Device.name}
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
                                      {convertDateTimeBefore(Device.timeStamp)}
                                </div>                                
                          </div>

                        </div>

                       
                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                            <div className='informationDeviceItemFirstIcon'>
                              <LuAlarmClock className='informationDeviceItemIcon' />  
                            </div>     
                            <div className='informationDeviceItemFirstTitle'>Thời gian báo thức:</div>
                          </div> 

                          <div className='informationDeviceItemSecond'>
                            <div className='informationDeviceItemSecondText'>
                              <TimePicker
                                onChange={setTime}       
                                value={time}
                                format="HH:mm:ss" // Hiển thị giờ, phút, giây (24h)
                                maxDetail="second" // Cho phép chỉnh cả giây
                                disableClock={false} // Ẩn đồng hồ tròn   
                                className='alarmTimeInput'
                              />
                            </div>  
                            <button className='btnAlarm' onClick={() => callAPIUpdateObjectById("ON")}>XÁC NHẬN</button>                           
                          </div>  
                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                              <div className='informationDeviceItemFirstIcon'>
                                  <GrConnect className='informationDeviceItemIcon'/>  
                              </div>        
                              <div className='informationDeviceItemFirstTitle'>Đối tượng đang giám sát:</div>
                          </div> 
                            
                          <div className='informationDeviceItemSecond'>
                                <div className='informationDeviceItemSecondText'>
                                     {ObjectIsConnect.name}
                                </div>                                
                          </div>
                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                            <div className='informationDeviceItemFirstIcon'>
                              <FaBluetooth className='informationDeviceItemIcon'/>  
                            </div>     
                            <div className='informationDeviceItemFirstTitle'>Bluetooth:</div>
                          </div> 

                          <div className="informationDeviceItemSecond">
                          <button className='btn-on' onClick={() => callAPIUpdateObjectById("ON")}>ON</button>
                          <button className='btn-off' onClick={() => callAPIUpdateObjectById("OFF")}>OFF</button>
                          </div>
                        </div>

                        <div className='informationDeviceItem'>
                          <div className='informationDeviceItemFirst'>
                            <div className='informationDeviceItemFirstIcon'>
                              <AiFillWarning className='informationDeviceItemIcon'/>  
                            </div>       
                            <div className='informationDeviceItemFirstTitle'>Mức cảnh báo:</div>
                          </div> 

                          <div className="informationDeviceItemSecond">
                                <button className='btn-off' onClick={() => callAPIUpdateObjectById("ON")}>EMERGENCY</button>
                                <button className='btn-on' onClick={() => callAPIUpdateObjectById("OFF")}>NORMAL</button>
                          </div>

                        </div>          
                </div>)}


                <div className='divBattery'>

                <h2 className="text-xl font-bold mb-4">Biểu đồ mức pin</h2>

                <div className='filterBattery'>                        
                                   <div className='filterItemBattery filterItemStartBattery'>
                                                   <div>    
                                                        Bắt đầu
                                                   </div>
                                                   <div>
                
                                                     <DatePicker
                                                       selected={valueFrom}
                                                       onChange={onChangeFrom}
                                                       showTimeSelect
                                                       timeIntervals={1}
                                                       timeFormat="HH:mm:ss"
                                                       dateFormat="dd/MM/yyyy - HH:mm:ss"
                                                       popperPlacement="bottom-start"
                                                     />
                                                   </div>
                                     </div> 
                                     <div className='filterItemBattery filterItemEndBattery'>
                                                   <div>
                                                     Kết thúc
                                                   </div>
                                                   <div>  
                                                   
                                                   <DatePicker
                                                         selected={valueTo}
                                                         onChange={onChangeTo}
                                                         showTimeSelect
                                                         timeIntervals={1}
                                                         timeFormat="HH:mm:ss"
                                                         dateFormat="dd/MM/yyyy - HH:mm:ss"
                                                         popperPlacement="bottom-start"
                                                     />
                                                   </div>
                                     </div>
                                     <div className='filterItemBattery filterItemButtonBattery'>
                                                   <button 
                                                       type="button" 
                                                       class="btn btn-info"
                                                       onClick={handleShowRoute}
                                                   
                                                   >Xem</button>
                                                   
                                     </div>
                
                </div>    
                
                {/* <div className="w-full h-[400px]">
                  
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div> */}


                <div className="w-full h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={formattedData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="time" />
                     <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                     <Tooltip content={<CustomTooltip />} />
                     <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                   </LineChart>
                 </ResponsiveContainer>
                </div>   

                </div>

               
                
          
      </div>
      
    </div>
  )
}

export default Detail
