import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'antd';

const MasterDetail = () => {
  const { masterType } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://102.133.144.226:8000/${masterType}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [masterType]);

  const columns = [
    {
      title: 'Column 1',
      dataIndex: 'column1',
      key: 'column1',
    },
    {
      title: 'Column 2',
      dataIndex: 'column2',
      key: 'column2',
    },
    // Add more columns based on your data structure
  ];

  return (
    <div>
      <h2>{masterType.replace(/_/g, ' ').toUpperCase()}</h2>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        Add {masterType.replace(/_/g, ' ')}
      </Button>
      <Table 
        dataSource={data} 
        columns={columns} 
        loading={loading} 
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default MasterDetail;
