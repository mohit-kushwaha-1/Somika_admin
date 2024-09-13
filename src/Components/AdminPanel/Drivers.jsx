import React, { useEffect, useState } from "react";
import Map from "../../Map";

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

  const showModal2 = () => {
    setIsModal2Visible(true);
  };


  
  const handleRowClick = (record) => {
    console.log("Clicked row data:", record);
    setRecord(record);
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

  const handleAlloted = () => {
    setIsModal2Visible(true);
  };

  useEffect(() => {
    fetchData();
    fetchVehicles();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/driver"
      );
      setData(response.data);
      console.log("response data is", response.data);

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
      setVehicles(response.data);
      console.log("vihicls alloted is", response.data);

      const countryCodesResponse = await fetch(
        "http://102.133.144.226:8000/api/v1/countryCode"
      );
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      // http://102.133.144.226:8000/api/v1/driver

      const drivers = await fetch("http://102.133.144.226:8000/api/v1/idType");
      const driver1 = await drivers.json();
      setDriverIDTypes(driver1);
      console.log(driver1[0]._id);
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

  const[image1,setImage] = useState();

  const uploadImage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file.file);
    console.log(file.file.name);

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


  console.log("image is ",image1);
  const handleFinish = async (values) => {
    //   let imageUrl = null;

    // if (values.photo) {
    //   // Upload the image and get the URL
    //   imageUrl = uploadImage(values.photo);
    //   if (!imageUrl) {
    //     return; // Exit if image upload failed
    //   }
    // }

    // console.log("image url is ",imageUrl);

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
      status: values.status ? "Active" : "Inactive",
    };

    console.log(driverData);

    try {
      if (isEditing) {
       const response =  await axios.put(
          `http://102.133.144.226:8000/api/v1/driver/${editingDriver._id}`,

          driverData
        );
        message.success("Driver updated successfully.");
        console.log("respose is",response.data)
        setPhoto("");
      } else {
        await axios.post(
          "http://102.133.144.226:8000/api/v1/driver",
          driverData
        );
        message.success("Driver added successfully.");
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

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://102.133.144.226:8000/api/v1/driver/${id}`, {
        status: status ? "Active" : "Inactive",
      });
      message.success("Driver status updated successfully.");
      fetchData();
    } catch (error) {
      message.error("Error updating driver status. Please try again later.");
      console.error("Error updating driver status:", error);
    }
  };

  const handleStatusToggle = async (record) => {
    const updatedStatus = record.status === 1 ? "Active" : "Inactive";
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
        // message.success(`Driver status updated `);
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
      // console.log("selected vehicles is follow",response.data);
      message.success("Vehicle data fetched successfully.");
    } catch (error) {
      message.error("Error fetching vehicle data.");
      console.error("Error fetching vehicle data:", error);
    }
  };

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
    {
      title: "Alternate Number",
      dataIndex: "alternate_num",
      key: "alternate_number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rating",
      dataIndex: ["ratings", "rating"],
      key: "rating",
      render: (_, record) => record.ratings?.rating?.[0]?.rating ?? "N/A",
    },
    {
      title: "Photo",
      // dataIndex: "photo",
      key: "photo",
      render: (_,record) => (
        <img src={`http://102.133.144.226:8000/${record?.photo}`} alt="Photo" style={{ width: 50, height: 50 }} />
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },

    {
      title: "Alloted Vehicles",
      key: "status",
      render: () => (
        //   <Select style={{ width: "140px" }} placeholder={"change Vihicle"}>
        //      {vehicles.map(option => (
        //   <Select.Option key={option._id} value={option.name}>
        //     {option.vehicle_number}
        //   </Select.Option>
        // ))}
        //   </Select>

        <Button onClick={() => handleAlloted()}>change Vehicle</Button>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Switch
              checked={record.status === 1}
              onChange={() => handleStatusToggle(record)}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
          />
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
      />
      <Modal
        title={isEditing ? "Edit Driver" : "Add Driver"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Driver Name"
            name="name"
            rules={[
              { required: true, message: "Please input the driver's name!" },
            ]}
          >
            <Input placeholder="Enter the driver's name" />
          </Form.Item>

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

          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

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
          <Flex mb={"20px"}>
            <Box mr={"20px"}>
              <Text color={"black"}>Vehicle Number</Text>
              <Text color={"black"}>Vehicle Id</Text>
              <Text color={"black"}>Capacity</Text>
              <Text color={"black"}>Brand make</Text>
            </Box>
            <Box>
              <Text color={"green"}>{record1?.vehicle_id?.vehicle_number}</Text>
              <Text color={"green"}>{record1?.vehicle_id?.vehicle_id}</Text>
              <Text color={"green"}>{record1?.vehicle_id?.capacity}</Text>
              <Text color={"green"}>
                {record1?.vehicle_id?.brand_make?.name}
              </Text>
            </Box>
          </Flex>
        ) : (
          <h1>data not found</h1>
        )}

        <Select
          style={{ width: "140px" }}
          placeholder={"change Vihicle"}
          onChange={changeVehicle}
          value={selectedVehicle}
          
        >
          {vehicles.map((option) => (
            <Select.Option key={option._id} value={option._id}>
              {option.vehicle_number}
            </Select.Option>
          ))}
        </Select>

        <Flex mt={"20px"}>


          {
             vehicleData?(<>
                    <Box mr={"20px"}>
            <Text color={"black"}>Vehicle Number</Text>
            <Text color={"black"}>Vehicle Id</Text>
            <Text color={"black"}>Capacity</Text>
            <Text color={"black"}>Brand make</Text>
          </Box>
          <Box>
            <Text color={"green"}>{vehicleData?.vehicle_number}</Text>
            <Text color={"green"}>{vehicleData?.vehicle_id}</Text>
            <Text color={"green"}>{vehicleData?.capacity}</Text>
            <Text color={"green"}>{vehicleData?.brand_make?.name}</Text>
          </Box>
             </>):(<><h1></h1></>)
          }
         
        </Flex>
      </Modal>
    </div>
  );
};

export default Drivers;
