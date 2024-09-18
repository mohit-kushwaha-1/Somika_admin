import React, { useState,useEffect } from 'react';
import { Card, Button, Spin, Col, Row } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';

const { Meta } = Card;

const A = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Fetch data from API

//   useEffect(()=>{
//     fetchData();
//   },[])
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/users/getAllUser'); // Replace with your API endpoint
      setData(response.data.data); // Assume API response is an array of items

    //   console.log("A data id",response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle card click
  const handleCardClick = (id) => {
    setSelectedCardId(id);
    console.log('Selected Card ID:', id); // Log the selected card ID
  };

  return (
    <div style={{ padding: '16px' }}>
      <Button onClick={fetchData} style={{ marginBottom: '16px' }}>
        Fetch Data
      </Button>

      {loading ? (
        <Spin />
      ) : (
        <Row gutter={16}>
          {data?.map(item => (
            <Col span={8} key={item._id}>
              <Card
                title={item.name} // Title of the card
                style={{ marginBottom: '16px', cursor: 'pointer' }} // Add cursor pointer for click effect
                onClick={() => handleCardClick(item._id)} // Handle card click
              >
                <Meta
                  title={item.name} // Name to be displayed on the card
                  description={item.name} // Description to be displayed on the card
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {selectedCardId && (
        <div style={{ marginTop: '16px' }}>
          <h2>Selected Card ID: {selectedCardId}</h2>
        </div>
      )}
    </div>
  );
};

export default A;
