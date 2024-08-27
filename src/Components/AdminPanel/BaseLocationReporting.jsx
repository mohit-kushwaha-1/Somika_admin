import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const BaseLocationReporting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBaseLocations();
  }, []);

  const fetchBaseLocations = async () => {
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations');
      const result = await response.json();

      console.log('API Response:', result); 

 
      const baseLocations = result.getAllBaseLocations.map(item => {
        const { BaseDetails, locations } = item.Base;
        return {
          key: BaseDetails._id,
          name: BaseDetails.name,
          address: BaseDetails.address,
          latitude: locations[0]?.coordinates?.coordinates[1],
          longitude: locations[0]?.coordinates?.coordinates[0],
        };
      });

      setData(baseLocations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching base locations:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Location Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
  ];

  return (
    <div>
      {/* <h2>Base Location Reporting</h2>  */}
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="key" 
      />
    </div>
  );
};

export default BaseLocationReporting;
