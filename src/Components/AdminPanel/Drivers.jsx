import React, { useEffect, useState } from "react";
import Map from "../../Map";
import { BellOutlined,TranslationOutlined ,TruckOutlined ,CloseCircleOutlined } from "@ant-design/icons";


import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Switch,
  Tag,
  Upload,
} from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { h1 } from "framer-motion/client";

const { Option } = Select;

const Drivers = () => {
  const [photo, setPhoto] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingDriver, setEditingDriver] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [driverIDTypes, setDriverIDTypes] = useState([]);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [record1, setRecord] = useState();
  const[changeVehicledata,setChangeVehicleData] = useState();
  const [unallotedV,setUnallotedV] = useState();

  const[changeImage,setChangeImage] = useState(false);
  const[ImageTobeuploaded,setImageTobeuploaded] = useState();
  const[image1,setImage] = useState();
  const[cross,setCross] = useState(true);

  const showModal2 = () => {
    setIsModal2Visible(true);
    setCross(true);
  };


  const handleCross = ()=>{
    setCross(false);
  }

  const handleImageChange = ()=>{
    setChangeImage(true);
    console.log(changeImage)
  }


  
  const handleRowClick = (record) => {
    console.log("Clicked row data:", record);
    setRecord(record);
    setImage(record?.photo);
    setCross(true);
   
    // Access the clicked row's data here
    // You can now use 'record' to get the details of the clicked row
  };

  const handleOk2 = async() => {
          try {
               
              if(record1?.vehicle_id){

                console.log("type is",record1?.driver_id?.type)
                  const response = await axios.post("http://102.133.144.226:8000/api/v1/driver/change-vehicle",{
                    driverId:record1?._id,
                    newVehicleId:selectedVehicle,
                  })

                  console.log("handleok",response.data);
                  if(response.data){
                    message.success("Vehicle change successfully")
                    setIsModal2Visible(false);
                    setSelectedVehicle("");
                    fetchData();
                    // setUnallotedV("")
                    
                    
                  }
              }
              else {
                const response = await axios.post("http://102.133.144.226:8000/api/v1/driver/allot-vehicle",{
                  driverId:record1?._id,
                  newVehicleId:selectedVehicle,
                })

                console.log("handleok",response.data);
                if(response.data){
                  message.success("Vehicle alloted successfully")
                  setIsModal2Visible(false);
                  // setUnallotedV("");
                  
                  fetchData();
                }
              }
              
          } catch (error) {
             console.log(error)
             message.error("there is some error occured ");
          }
  };

  const handleCancel2 = () => {
    setIsModal2Visible(false);
    setSelectedVehicle(null); 
    setVehicleData(null)
   
  };

  const handleAlloted = async() => {
    setIsModal2Visible(true);

    try {
      const response = await axios.get("http://102.133.144.226:8000/api/v1/vehicles/getUnallottedVehicles")
      console.log("unalloted is",response.data.unallottedVehicles);
      setUnallotedV(response.data.unallottedVehicles)
      
    } catch (error) {
       console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
    fetchVehicles();
    getAllChangeVehicles();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/driver"
      );

      const reversedData = [...response.data].reverse();

      setData(reversedData);
      console.log("response data is", reversedData);

      const response3 = await axios.get(
        "http://102.133.144.226:8000/api/v1/vehicles"
      );
      // setData(response.data);
      // console.log("vehicals",response3.data[0].vehicle_number
      // );
    } catch (error) {
      message.error("Error fetching drivers. Please try again later.");
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/vehicles"
      );

      const reversedData = [...response.data].reverse();
      setVehicles(reversedData);
      // console.log("vihicls alloted is", response.data);

      const countryCodesResponse = await fetch(
        "http://102.133.144.226:8000/api/v1/countryCode"
      );
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      // http://102.133.144.226:8000/api/v1/driver

      const drivers = await fetch("http://102.133.144.226:8000/api/v1/idType");
      const driver1 = await drivers.json();
      setDriverIDTypes(driver1);
      // console.log(driver1[0]._id);
      // setCountryCodes(countryCodesResult);
    } catch (error) {
      message.error("Error fetching vehicles. Please try again later.");
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingDriver(record);
    form.setFieldsValue({
      name: record.name,
      driver_id_type: record.driver_id?.type,
      driver_id_number: record.driver_id?.number,
      photo: record.photo,
      country_code: record.country_code,
      number: record.number,
      alternate_num: record.alternate_num,
      license: record.license,
      address: record.address,
      vehicle_id: record.vehicle_id,
      status: record.status === "Active",
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPhoto("");
  };

  

  const uploadImage = async (file) => {
    console.log(file);
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


  const getAllChangeVehicles = async()=>{
        try {
            const response = await axios.get("http://102.133.144.226:8000/api/v1/vehicles/getUnallottedVehicles")
            console.log("get not alloted vehicles",response?.data.unallottedVehicles);
            setChangeVehicleData(response?.data.unallottedVehicles)
        } catch (error) {
            console.log(error);
        }
  }


  // console.log("image is ",image1);
  const handleFinish = async (values) => {
   

    const driverData = {
      driver_id: {
        type: values.driver_id_type,
        number: values.driver_id_number,
      },
      photo: image1,
      name: values.name,
      country_code: values.country_code,
      number: values.number,
      alternate_num: values.alternate_num,
      license: values.license,
      address: values.address,
      vehicle_id: values.vehicle_id,
      status:  'Active',
    };





    
    

    

    try {
      if (isEditing) {


        const driverData2 = {
          driver_id: {
            type: values.driver_id_type,
            number: values.driver_id_number,
          },
          photo: record1.photo,
          name: values.name,
          country_code: values.country_code,
          number: values.number,
          alternate_num: values.alternate_num,
          license: values.license,
          address: values.address,
          vehicle_id: values.vehicle_id,
          status:  'Active',
        };


        const driverData1 = {
          driver_id: {
            type: values.driver_id_type,
            number: values.driver_id_number,
          },
          photo: image1,
          name: values.name,
          country_code: values.country_code,
          number: values.number,
          alternate_num: values.alternate_num,
          license: values.license,
          address: values.address,
          vehicle_id: values.vehicle_id,
          status:  'Active',
        };

        console.log("changeVehicledata is ",changeImage);

        if(changeImage === true){
          setImageTobeuploaded(driverData1)
          console.log("ImageTobeuploaded",ImageTobeuploaded);
        }

        if(changeImage === false){
          setImageTobeuploaded(driverData2)
          console.log("ImageTobeuploaded",ImageTobeuploaded);
        }

       const response =  await axios.put(
          `http://102.133.144.226:8000/api/v1/driver/${editingDriver._id}`,

          driverData
        );

        if(response.data){
          setImageTobeuploaded("");
          console.log("image should be change to ",response.data)
          console.log("changeVehicledata is ",changeImage);
          setChangeImage(false);
          
        }
        message.success("Driver updated successfully.");
        // console.log("respose is",response.data)
        setPhoto("");
      } else {




        await axios.post(
          "http://102.133.144.226:8000/api/v1/driver",
          driverData
        );
        message.success("Driver added successfully.");
        setPhoto("");
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error submitting form. Please try again later.");
      console.error("Error submitting form:", error);
    }
  };

  // const handleDelete = async (driverId) => {
  //   try {
  //     await axios.delete(`http://102.133.144.226:8000/api/v1/driver/${driverId}`);
  //     message.success('Driver deleted successfully.');
  //     fetchData();
  //   } catch (error) {
  //     message.error('Error deleting driver. Please try again later.');
  //     console.error('Error deleting driver:', error);
  //   }
  // };

  // const handleStatusChange = async (id, status) => {
  //   try {
  //     await axios.patch(`http://102.133.144.226:8000/api/v1/driver/${id}`, {
  //       status: status ? "Active" : "Inactive",
  //     });
  //     message.success("Driver status updated successfully.");
  //     fetchData();
  //   } catch (error) {
  //     message.error("Error updating driver status. Please try again later.");
  //     console.error("Error updating driver status:", error);
  //   }
  // };

  const handleStatusToggle = async (record) => {
    const updatedStatus = record.status === "Active" ? "Inactive" : "Active";
    const updatedData = { status: updatedStatus }; // Only send the status in the request body

    try {
      const response = await fetch(
        `http://102.133.144.226:8000/api/v1/driver/${record._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();
      // console.log("result sdf df", result);
      if (result.message) {
        fetchData(); // Reload employee data
        message.success(`Driver status has been changed `);
      } else {
        message.error("Failed to update Driver status.");
      }
    } catch (error) {
      message.error("Error updating Driver status.");
      console.error("Error updating Driver status:", error);
    }
  };

  // const [vehicles, setVehicles] = useState([]);
  

  const changeVehicle = async (value) => {
    setSelectedVehicle(value);
    try {
      const response = await axios.get(
        `http://102.133.144.226:8000/api/v1/vehicles/${value}`
      );
      setVehicleData(response.data);
      if(response){
        fetchVehicles();
      }
      // console.log("selected vehicles is follow",response.data);
      // message.success("Vehicle Change Successfully.");
    } catch (error) {
      message.error("Error fetching vehicle data.");
      console.error("Error fetching vehicle data:", error);
    }
  };


  useEffect(() => {
    if (editingDriver) {
      // Populate form fields when editingDriver data is available
      form.setFieldsValue({
        name: editingDriver?.name,
        driver_id_type: editingDriver?.driver_id?.type,
        driver_id_number: editingDriver?.driver_id?.number,
        country_code: editingDriver?.country_code,
        number: editingDriver?.number,
        alternate_num: editingDriver?.alternate_num,
        license: editingDriver?.license,
        address: editingDriver?.address,
        vehicle_id: editingDriver?.vehicle_id?.vehicle_number,  // Use _id for vehicle selection
        status: editingDriver?.status === "Active",  // Set status switch correctly
        // photo:image1,
      });

    } else if(!editingDriver) {
      // Clear form fields when adding a new driver
      form.resetFields(); 
    }
  }, [editingDriver, form]);
  

  const columns = [
    {
      title: "Driver Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "License Number",
      dataIndex: ["driver_id", "number"],
      key: "license_number",
      render: (_, record) => record.driver_id?.number,
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "phone_number",
    },
    // {
    //   title: "Alternate Number",
    //   dataIndex: "alternate_num",
    //   key: "alternate_number",
    // },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rating",
      dataIndex: ["ratings", "rating"],
      key: "rating",
      render: (_, record) => record.ratings?.rating?.[0]?.rating ?? "0",
    },
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
          style={{ width: 70, height: 70 }}
        />
      ),
    },
    


    {
      title: "Allot Vehicle",
      key: "status",
      render: (_, record) => (
        record?.vehicle_id?.vehicle_number ? (
          <> <h1 onClick={() => handleAlloted(record)} style={{cursor:"pointer"}}> {record?.vehicle_id?.vehicle_number}</h1> </>
        ) : (
          <Button onClick={() => handleAlloted(record)}>Allote Vehicle</Button>
        )
      ),
    },
     
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === "Active"}
          onChange={() => handleStatusToggle(record)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button  onClick={() => handleEdit(record)}>
            Update
          </Button>
          
        </div>
      ),
    },
  ];


  console.log("selected jhgjhg",selectedVehicle);
  




  return (
    <div>
      
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Driver
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        
        rowKey={(record) => record._id}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record); // Trigger the click handler
          },
        })}

        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={isEditing ? "Edit Driver" : "Add Driver"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish} 
        // initialValues={{
        //   name: editingDriver?.name,
        //   driver_id_type: editingDriver?.driver_id?.type,
        //   driver_id_number: editingDriver?.driver_id?.number,
        //   country_code: editingDriver?.country_code,
        //   number: editingDriver?.number,
        //   alternate_num: editingDriver?.alternate_num,
        //   license: editingDriver?.license,
        //   address: editingDriver?.address,
        //   vehicle_id: editingDriver?.vehicle_id?._id,  // Use the correct _id from vehicle object
        //   status: editingDriver?.status === "Active",  // Set switch to true if active
        // }}
        >
          <Form.Item
            label="Driver Name"
            name="name"
            rules={[
              { required: true, message: "Please input the driver's name!" },
            ]}
          >
            <Input placeholder="Enter the driver's name" />
          </Form.Item>



          {/* {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                height="100px"
                width="100px"
              />
            </div>
          )} */}

          {
            isEditing?(<> 
            

            {
              cross?(<>
                 <CloseCircleOutlined style={{width:"30px"}} onClick={handleCross} />
             <img src={`${record1?.photo}`} alt="" style={{width:"100px",height:"100px"}} onClick={handleImageChange}/>
             
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

          {/* {
            isEditing?(<>h1 welcome</>):(<div>
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                height="100px"
                width="100px"
              />
            </div>)
          } */}

          <Form.Item
            label="Driver ID Type"
            name="driver_id_type"
            rules={[
              { required: true, message: "Please select the driver ID type!" },
            ]}
          >
            <Select placeholder="Select ID Type">
              {driverIDTypes.map((type) => (
                <Option key={type} value={type._id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Driver ID Number"
            name="driver_id_number"
            rules={[
              { required: true, message: "Please input the driver ID number!" },
            ]}
          >
            <Input placeholder="Enter the driver ID number" />
          </Form.Item>

          <div className="mobile_code">
            <Form.Item
              label="Country Code"
              name="country_code"
              rules={[
                { required: true, message: "Please select the country code!" },
              ]}
            >
              <Select placeholder="Select Country Code">
                {countryCodes.map((code) => (
                  <Option key={code._id} value={code._id}>
                    {code.code}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="number"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input placeholder="Enter the phone number" />
            </Form.Item>
          </div>

          <Form.Item
            label="Alternate Number"
            name="alternate_num"
            rules={[{ required: false }]}
          >
            <Input placeholder="Enter the alternate number" />
          </Form.Item>

          <Form.Item
            label="License"
            name="license"
            rules={[{ required: true, message: "Please input the license!" }]}
          >
            <Input placeholder="Enter the license details" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input placeholder="Enter the address" />
          </Form.Item>

          <Form.Item
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select Vehicle ID">
              {vehicles.map((vehicle) => (
                <Option key={vehicle._id} value={vehicle._id}>
                  {vehicle.vehicle_id}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Driver" : "Add Driver"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        // title="Modal 2"
        visible={isModal2Visible}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        {record1?.vehicle_id ? (
            <>
           <Text mb={"10px"} style={{fontWeight:"bold"}}>Alloted Vehicle</Text>
          <Flex mb={"20px"}>
            
            <Box mr={"20px"}>
              <Text color={"black"}  style={{fontWeight:"bold"}}>Vehicle Number</Text>
              <Text color={"black"} style={{fontWeight:"bold"}}>Vehicle Id</Text>
              <Text color={"black"} style={{fontWeight:"bold"}}>Capacity</Text>
              <Text color={"black"} style={{fontWeight:"bold"}}>Brand make</Text>
            </Box>
            <Box>
              <Text >{record1?.vehicle_id?.vehicle_number}</Text>
              <Text >{record1?.vehicle_id?.vehicle_id}</Text>
              <Text >{record1?.vehicle_id?.capacity}</Text>
              <Text >
                {record1?.vehicle_id?.brand_make?.name}
              </Text>
            </Box>
          </Flex>
          </>
        ) : (
          <Text mb={"10px"} color={"red"}>There is no alloted Vehicle</Text>
        )}
      
      <Text mb={"10px"} style={{fontWeight:"bold"}}>Change Vehicles</Text>
        <Select
          style={{ width: "140px" }}
          placeholder={"Change Vehicle"}
          onChange={changeVehicle}
          value={selectedVehicle}
          
        >
          {unallotedV?.map((option) => (
            <Select.Option key={option._id} value={option._id}>
              {option.vehicle_number}
            </Select.Option>
          ))}
        </Select>

        <Flex mt={"20px"}>


          {
             vehicleData?(<>
                    <Box mr={"20px"}>
            <Text color={"black"} style={{fontWeight:"bold"}}>Vehicle Number</Text>
            <Text color={"black"} style={{fontWeight:"bold"}}>Vehicle Id</Text>
            <Text color={"black"} style={{fontWeight:"bold"}}>Capacity</Text>
            <Text color={"black"} style={{fontWeight:"bold"}}>Brand make</Text>
          </Box>
          <Box>
            <Text >{vehicleData?.vehicle_number}</Text>
            <Text >{vehicleData?.vehicle_id}</Text>
            <Text >{vehicleData?.capacity}</Text>
            <Text >{vehicleData?.brand_make?.name}</Text>
          </Box>
             </>):(<><h1></h1></>)
          }
         
        </Flex>
      </Modal>
    </div>
  );
};

export default Drivers;
