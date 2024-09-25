import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, message, Upload, Switch } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { BellOutlined,TranslationOutlined ,TruckOutlined ,CloseCircleOutlined } from "@ant-design/icons";

import { render } from '@testing-library/react';

const { Option } = Select;

const Vehicle = () => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingVehicle, setEditingVehicle] = useState(null);


  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [brandMakes, setBrandMakes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [baseLocations, setBaseLocations] = useState([]);
  const [allowedLocations, setAllowedLocations] = useState([]);
  const [record1, setRecord] = useState();

  const[image1,setImage] = useState();


  const [brand, setBrand] = useState("");
  const [transmit, setTransmite] = useState("");
  const [status1, setStatus1] = useState(""); // Default status is "booked"
  const [bLocation, setBLocation] = useState(""); // Default tripType is "interoffice"
  const[filterN,setFilterN] = useState(false);
  // const [employeeId, setEmployeeId] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  console.log("brand",brand,"transmit",transmit,"status1",status1,"bLocation",bLocation);




  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  
  const[cross,setCross] = useState(true);

  // const[image1,setImage] = useState();



  const handleCross = ()=>{
    setCross(false);
  }



  const filterDataIs = async()=>{

       
           try {
               const response =await axios.get(`http://102.133.144.226:8000/api/v1/report/vehicle-report/?status=${status1}&baseLocation=${bLocation}&brand=${brand}&transmissionType=${transmit}`)
           
                 console.log("filter data is now ",response.data);
                 if(response){
                  setFilteredData(response.data)
                  setFilterN(true);
                 }
                 
              } catch (error) {
              console.log(error)
           }
  }


  const resetFilter = ()=>{
    setBrand("")
    setTransmite("")
    setStatus1("")
    setBLocation("")
    setFilteredData(null)
    setFilterN(false);
  }
  // useEffect(()=>{
  //   filterDataIs()
  // },[])

  
  const handleRowClick = (record) => {
    console.log("Clicked row data:", record);
    setRecord(record);
    setImage(record?.photo);
    setCross(true);
    setFilteredData(null)
   
    // Access the clicked row's data here
    // You can now use 'record' to get the details of the clicked row
  };
  

  // Function to handle change event
  

  const uploadImage = async (file) => {
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file.file);
    // console.log(file.file.name);

    try {
      const response = await axios.post(
        "http://102.133.144.226:8000/api/v1/users/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Image uploaded successfully!");
      setImage(response.data.filePath);
      // console.log("image is ",image1);
      // console.log("image is ",response.data.filePath
      // );
      return response.data.url; // Assuming the API returns the image URL in the 'url' field
    } catch (error) {
      message.error("Error uploading image. Please try again later.");
      console.error("Image upload error:", error);
      return null;
    }
  };


  useEffect(() => {
    fetchData();
    fetchDropdownData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
      setData(response.data);
      // console.log("responce data  is now ",response.data);

      const data1 = response.data;

      const final = data1.map((item)=>{
                 
        const a = {
          capacity:item?.capacity,
          vehicle_number:item?.vehicle_number,
          vehicle_id:item?.vehicle_id,
          TrasmissionType:item?.TrasmissionType?.type,
          brand_make:item?.brand_make?.name,
          base_location:item?.base_location?.companyId?.name,
        
        }
           
      })


      // const base = await axios.get("http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations")
      // console.log("base",base?.data?.getAllBaseLocations[0].Base.BaseDetails.name);

      // const a = base?.data?.getAllBaseLocations.map((item)=>{
      //         return item.Base.BaseDetails.name
      // })


    // const b =   response.data.forEach((vehicle, index) => {
    //     if (a[index]) {
    //       vehicle.base_location = a[index];  
    //     } else {
    //       vehicle.base_location = "Default Location";  
    //     }
    //   });

      // setBaseLocations(a)
      // console.log("b is ",b);

      // console.log("a is ",a);
    } catch (error) {
      message.error('Error fetching vehicles. Please try again later.');
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleLocationChange = (value) => {
    
      // If a value is selected, store it in state
      setSelectedLocation(value);
      // fetchDropdownData();
      // console.log("Selected location:", value);
  };


  // useEffect(()=>{
  //   if(selectedLocation){
  //     const allowlo = allowedLocations.filter((item)=>{
  //        return item.value !==selectedLocation;
  //     })
  //     setSelectedLocation("");
  //     setAllowedLocations(allowlo);
  //     console.log("filter data is",allowlo);
      
  // }
  // else{
  //   setAllowedLocations(allowedLocations);
  //   setSelectedLocation("");
  //   console.log("wehfrwhejrk");
  // }
  // },[selectedLocation])


  const filterdataIs = async()=>{
      try {
          const response = await axios.get(`http://102.133.144.226:8000/api/v1/report/tripReport/?startDate=${'2024-09-01'}&endDate=${'2024-09-30'}&status=${'booked'}&tripType=interoffice&employeeId=66c865228897f067258244f3`);

          console.log("filter data is",response.data);
      } catch (error) {
        
      }
  }

  // useEffect(()=>{
  //   filterdataIs();
  // },[])


  const fetchDropdownData = async () => {
    try {

      const transmissionResponse = await fetch('http://102.133.144.226:8000/api/v1/transmission');
      const transmissionResult = await transmissionResponse.json();
      setTransmissionTypes(transmissionResult);


      const brandMakesResponse = await fetch('http://102.133.144.226:8000/api/v1/brand');
      const brandMakesResult = await brandMakesResponse.json();
      setBrandMakes(brandMakesResult);


      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      const baseLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const baseLocationsResult = await baseLocationsResponse.json();
      const baseLocationsData = baseLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));
      setBaseLocations(baseLocationsData);
      console.log("basel locaion is ",baseLocationsData);


      const allowedLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const allowedLocationsResult = await allowedLocationsResponse.json();
      const allowedLocationsData = allowedLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));

      setAllowedLocations(allowedLocationsData);
      console.log("selected check ",selectedLocation);


      

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      message.error('Error fetching dropdown data.');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };


  const handleEdit = (record) => {
    console.log('Editing record:', record);
    if (!record || !record._id) {
      message.error('Invalid record data.');
      return;
    }
    setEditingVehicle(record);

    const aray = record?.allowed_locations?.location?.map((item)=>{
           return  item?.companyId?._id
    })

    console.log("arr is ",aray);

    
      
    const dataToSend = {
      allowed_locations: {
        location: record.allowed_locations
      }
    };


    console.log("data to send",dataToSend)
    form.setFieldsValue({
      vehicle_id: record.vehicle_id || '',
      vehicle_number: record.vehicle_number || '',
      capacity: record.capacity || 0,
      TrasmissionType: record.TrasmissionType?._id || '',
      brand_make: record.brand_make?._id || '',
      mobile: record.mobile || '',
      country_code: record.country_code?._id || '',
      base_location: record.base_location?._id || '',
      allowed_locations: dataToSend || '',
      status: record.status === 'Active',
    });

    setIsEditing(true);
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleStatusToggle = async (record) => {
    const updatedStatus = record.status === "Active" ? 'Inactive' : 'Active';
    const updatedData = { status: updatedStatus }; // Only send the status in the request body
  
    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/vehicles/${record._id}/status`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      console.log("result sdf df",result);
      if (result.message) {
        fetchData(); // Reload employee data
        message.success(`Vehicle status updated `);
      } else {
        message.error('Failed to update Vehicle status.');
      }
    } catch (error) {
      message.error('Error updating Vehicle status.');
      console.error('Error updating Vehicle status:', error);
    }
  };

  const handleFinish = async (values) => {
    
    const dataToSend =  {
        location: values.allowed_locations
      }
    

    const vehicleData = {
      vehicle_id: values.vehicle_id,
      photo: image1,
      vehicle_number: values.vehicle_number,
      capacity: values.capacity,
      TrasmissionType: values.TrasmissionType,
      brand_make: values.brand_make,
      mobile: values.mobile,
      country_code: values.country_code,
      base_location: values.base_location,
      allowed_locations: dataToSend,
      status: values.status ,
      vehicle_image: values.vehicle_image ? values.vehicle_image.file.originFileObj : undefined,
    };

    try {
      if (isEditing) {
        await axios.put(`http://102.133.144.226:8000/api/v1/vehicles/${editingVehicle._id}`, vehicleData);
        message.success('Vehicle updated successfully.');
      } else {
        await axios.post('http://102.133.144.226:8000/api/v1/vehicles', vehicleData);
        message.success('Vehicle added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };



  // const [selectedValues, setSelectedValues] = useState([]);
  // const handleChange = (value) => {
  //   if (value.includes('selectAll')) {
  //     // If "Select All" is clicked, select all options
  //     setSelectedValues(allowedLocations.map(loc => loc.value).concat('selectAll'));
  //   } else if (value.length === allowedLocations.length) {
  //     // If all options are selected, set "Select All" as well
  //     setSelectedValues([...value, 'selectAll']);
  //   } else {
  //     // Otherwise, update selected values
  //     setSelectedValues(value.filter(val => val !== 'selectAll'));
  //   }
  // };

  // const handleDeselect = (value) => {
  //   if (value === 'selectAll') {
  //     // If "Select All" is deselected, clear all selections
  //     setSelectedValues([]);
  //   } else if (selectedValues.length === allowedLocations.length) {
  //     // If all options are deselected, remove "Select All"
  //     setSelectedValues(value.filter(val => val !== 'selectAll'));
  //   } else {
  //     // Otherwise, update selected values
  //     setSelectedValues(value);
  //   }
  // };


  // useEffect(() => {
  //   if (isEditing && editingVehicle) {
  //     form.setFieldsValue({
  //       vehicle_id: editingVehicle.vehicle_id,
  //       vehicle_number: editingVehicle.vehicle_number,
  //       capacity: editingVehicle.capacity,
  //       TrasmissionType: editingVehicle?.TrasmissionType?._id,
  //       brand_make: editingVehicle.brand_make?._id,
  //       mobile: editingVehicle.mobile,
  //       country_code: editingVehicle.country_code,
  //       base_location: editingVehicle?.base_location?.companyId?._id,
  //       allowed_locations: editingVehicle?.allowed_locations?.location?.map((item)=>{
  //                  return item?.companyId?._id
  //       }), // Prepopulate locations
  //       status: editingVehicle.status,
  //     });
  //   }

  //   console.log(",editingVehicleeditingVehicle",editingVehicle);
  // }, [isEditing, editingVehicle, form]);
  
  

  const columns = [
    {
      title:  !filterN ?'Chassis ID/Vehicle ID':'',
      dataIndex: !filterN ? 'vehicle_id' : '',
      key: 'vehicle_id',
    },
    {
      title: 'Vehicle Number',
      dataIndex: filterN ? 'vehicleNumber' : 'vehicle_number',
      // dataIndex: 'vehicle_number',
      key: 'vehicle_number',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Transmission Type',

      // transmissionType
      dataIndex: filterN ? 'transmissionType' : ['TrasmissionType', 'type'],
      // dataIndex: ['TrasmissionType', 'type'],
      key: 'TrasmissionType.type',
    },
    {
      title: 'Brand Make',
      dataIndex: filterN ? 'brand' : ['brand_make', 'name'],
      // dataIndex: ['brand_make', 'name'],
      key: 'brand_make.name',
    },
    // {
    //   title: 'Country Code',
    //   dataIndex: ['country_code', 'code'],
    //   key: 'country_code.code',
    // },
    // {
    //   title: 'Mobile',
    //   dataIndex: 'mobile',
    //   key: 'mobile',
    // },

    {
      title: 'Base Location',
      // dataIndex: ['base_location','companyId', 'name'],
      dataIndex: filterN ? ['baseLocation','companyName'] :  ['base_location','companyId', 'name'],
      key: 'base_location',
      // render:(record)=>{
      //     if(record?.base_location){
      //       let color="black";
      //       let statusText = record?.base_location;

      //       return (
      //         <span style={{ color }}>
      //           {statusText}
      //         </span>
      //       );
      //     }
      // }
      
    },
    // {
    //   title: 'Allowed Location',
    //   key: 'allowed_locations',
    //   render: (record) => {
    //     // Check if allowed_locations and location array exist
    //     if (record.allowed_locations?.location ) {
    //       return record.allowed_locations.location
    //         .map((loc) => loc?.companyId?.name || 'N/A')
    //         .join(', '); // Join the names with commas if multiple
    //     }
    //     return 'N/A'; // Return 'N/A' if no locations available
    //   }
    // }
    // ,
    // {

    {
      title: "Photo",
      key: "photo",
      render: (_, record) => (
        <img
          src={
            record?.photo
              ? `${record.photo}`
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAMFBMVEXk5ueutLfp6+y2vL6rsbWor7KyuLu6v8LT1tjY29zb3t/Gysze4eLDx8rP09TJzc8ZZtZUAAAD90lEQVR4nO2c246jMAxAickVCPn/v90And22gtaJwWa0OS8jjebhyIlNLs50XaPRaDQajUaj0Wg0Go1G10E3DWGex5hJPgwdgLTSHtD56Kw2Ri/kH9aNvrudKgSnlFYvaK1snO6lGnrzZvkja1yQlvtLjqbe19zi6u4S1fhBc1VVSVqxW8JpP2sumF48qDC/p9B+UK30TE0Iy011Fo1pNFhRZQRNYcR7LjEVE02Y6fkUUy+jCXOZZzadZExLPZXuRTz7YlGlo4DnWO65TFP21J8qNBe4RcHVBHQZfGbToaSCPmMHVk9wlZ5Kj6yiodYzw1pMY90MXTCJcZZOlhBRzsT3tam0hpQvnWpr0wO+CgWUgOYKxeXZBaIo17YECteh77DtSuqr/UOUbffcE0W5FnsDqYpmuNbPgSpqmb6inujJ9bmHmeqpeb5N5bvPd5g+oieI8lT8/0iUaY7Ss14zlSfKPmSDS5Rc8Hk8iRuRPPKOSRR+y6Lk1yzzyPWJ7UB3Im5F2LahQItoz7cLrTob/YHzImegiBo2za7qWPxvQPlGPkPIe6al04P6jxPbZ2kDqs8d+Tb1D9PaUsp91QSpzlTg/qYq8bXlv2KuWz4L3IaW3YE/ELkJB0QzySvayfQWlBZTiQm6UTZNNdfZ2J5p0TTlvVx8AfAxzfEUbdPBtGetnv0g3aJlMcNveJci+6SvvWTact5/HgLhS1CNEx/2H+ZPbZlWqN1pD4DU704ArRz/cukjS4ezfevK1caO4X5dzpkhOW3WWaC1US4JVvgvAEA3BO99mG7a2/4AXpHW2WGxmsKcYnSuzzjn4jjnwN5GdxX0KS4vBcxrMq2/yVN1nMMwyeYUwOCj65X5VPCXVw7WxSSX/xCiXZ8vYMh/ZR3/RiSPt4/q4DHDMcYsJYsvsAA+Hj25+BbYPAsS08IUumSR473vqhTLS5cwfkwdZFydv9YVJod6yPBdVfcXLlagO0lzVVX2IlWYxroEOsS4cIEqzITj8AO0iqcXq4l4W3ekevb4f9pr0DDuzPOTgkc2xZwXVBiKj+0KVU/aTJPab1GcMvy060QkuidnP7jL47lCPkIj9LEXmpJOU4hd1yWQjiUZPRfqM4ojj56oPTqnt7YVUntpQmxirzGtekpQ+wSMZFqzT2UrTM9UTFPuCbpRMU0lNFX5C+f6DgcqZZ2QBRddZ1OY+byfpBeKGuJIDVhE9IgPKfM3/o2CTjNiNyNVFL0zoT6sooLvP6A2W1PBHqDI1aYN7KthQP9Lj6tEsZtS0ZxfwZXSidi9Tgf57zcGaU9sR+T1JyNfwTV2VPYxngmukoqt8P5hUKKj7aXBLUrhBqBEG41b8QcZDDNkChgRlgAAAABJRU5ErkJggg==" // Dummy image URL
          }
          alt="Photo"
          style={{ width: 90, height: 90 }}
        />
      ),
    },

      {
        title: 'Status',
        key: 'status',
        render:!filterN? (_, record) => (
          <Switch
            checked={record.status === "Active"}
            onChange={() => handleStatusToggle(record)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        ):(_, record) => (
            <>
            <h1>{record?.status}</h1>

            </>
        ),
      },
    
    
      {
        
      title: !filterN ?'Actions':"",
      key: 'actions',
      render:!filterN ? (_, record) => (
        <>
          <Button  onClick={() => handleEdit(record)}>
            Update
          </Button>
          
        </>
      ):"",
    },
  ];

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://102.133.144.226:8000/api/v1/vehicles/${id}`, { status: status ? 'Active' : 'Inactive' });
      message.success('Vehicle status updated successfully.');
      fetchData();
    } catch (error) {
      message.error('Error updating vehicle status. Please try again later.');
      console.error('Error updating vehicle status:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Vehicle
      </Button>

        
      <form   >
        <div style={{ display: "flex" }}>
          

          <div>
            <label>Brand Make </label>
            {/* brand, setBrand */}
            <br />
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={{
                border: "1px solid black",
                width: "250px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
                <option value="">Select BrandMakes</option>
                {brandMakes.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}

            </select>
          </div>




          <div>
            <label>Transmission Types </label>
            {/* transmit, setTransmite */}
            <br />
            <select
              value={transmit}
              onChange={(e) => setTransmite(e.target.value)}
              style={{
                border: "1px solid black",
                width: "250px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >

              <option value="">Select TransmissionTypes</option>
              {transmissionTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Status: </label>
            <br />
            <select
              value={status1}
              onChange={(e) => setStatus1(e.target.value)}
              style={{
                border: "1px solid black",
                width: "250px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            > 
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              
            </select>
          </div>

          <div>
            <label>Base Location: </label>
            <br />
            {/* bLocation, setBLocation */}
            <select
              value={bLocation}
              onChange={(e) => setBLocation(e.target.value)}
              style={{
                border: "1px solid black",
                width: "250px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >

             <option value="">Select base Location</option>
             {baseLocations.map(loc => (
               
                <option key={loc.value} value={loc.value}>
                   {loc.label}
                </option>
              ))}

            </select>
          </div>

          
        </div>

        
      </form>

      
      <div style={{marginBottom:"20px"}}>
      <button onClick={filterDataIs}  style={{width:"110px",background:"blue",marginTop:"10px",height:"30px",borderRadius:"10px",color:"white",marginRight:"20px"}}>Filter</button>
      <button onClick={resetFilter} style={{width:"110px",background:"blue",marginTop:"10px",height:"30px",borderRadius:"10px",color:"white"}}>Reset Filter</button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData || data}
        loading={loading}
        // rowKey="_id"
        rowKey={(record) => record._id}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record); // Trigger the click handler
          },
        })}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Chassis ID/Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input placeholder='Enter Vehicle Id' />
          </Form.Item>
          <Form.Item
            label="Vehicle Number"
            name="vehicle_number"
            rules={[{ required: true, message: 'Please input the vehicle number!' }]}
          >
            <Input placeholder='Enter Vehicle Number' />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please select the capacity!' }]}
          >
            <Select placeholder="Select capacity">
              <Option value={4}>4</Option>
              <Option value={7}>7</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Transmission Type"
            name="TrasmissionType"
            rules={[{ required: true, message: 'Please select the transmission type!' }]}
          >
            <Select placeholder="Select Transmission Type">
              {transmissionTypes.map((type) => (
                <Option key={type._id} value={type._id}>
                  {type.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand Make"
            name="brand_make"
            rules={[{ required: true, message: 'Please select the brand make!' }]}
          >
            <Select placeholder="Select Brand Make">
              {brandMakes.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            <Select placeholder="Select Country Code">
              {countryCodes.map((code) => (
                <Option key={code._id} value={code._id}>
                  {code.code}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input placeholder='9479999999' />
          </Form.Item> */}

          <Form.Item
            label="Add Location"
            name="base_location"
            // mode="multiple"
            rules={[{ required: true, message: 'Please select the base location!' }]}
          >
            <Select placeholder="Select Base Location" onChange={handleLocationChange}>
              {baseLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item >

          <Form.Item
            label="Allowed Locations"
            name="allowed_locations"
            rules={[{ required: true, message: 'Please select the allowed location!' }]}
          >
            <Select
               mode="multiple"
               placeholder="Select Allowed Locations"
              //  value={selectedValues}
              //  onChange={handleChange}
              //  onDeselect={handleDeselect}
            >

           {/* <Option key="selectAll" value="selectAll">
            Select All
          </Option> */}

              {allowedLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {
            isEditing?(<> 
            

            {
              cross?(<>
                 <CloseCircleOutlined style={{width:"30px"}} onClick={handleCross} />
             <img src={`${record1?.photo}`} alt="" style={{width:"100px",height:"100px"}} />
             
              </>):(<>
                  
                <Form.Item
              label="Photo"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              
              rules={[
                { required: true, message: "Please upload the driver's photo!" },
              ]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={uploadImage}
  
                
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item>
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  height="100px"
                  width="100px"
                />
              </div>
            )}
              </>)
            }
            
            
            </>):(<>
            
            
          <Form.Item
            label="Photo"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            rules={[
              { required: true, message: "Please upload the driver's photo!" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={uploadImage}

              
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  height="100px"
                  width="100px"
                />
              </div>
            )}
            
            
            
            </>)
          }

          {/* <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicle;
