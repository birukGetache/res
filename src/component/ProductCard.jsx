import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiHeart } from 'react-icons/fi';
import { setItems } from '../itemsReducer';  // Assuming you're using Redux to store items
import Modal from 'react-modal';
import axios from 'axios';

const Card = styled.div`
  border: none;
  border-radius: 8px;
  height: 130px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0.5, 0.5, 0.5, 0.5);
  text-align: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Image = styled.img`
  width: 35vw;
  height: 50%;
  border-radius: 8px;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 0.8rem;
  color: #333;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;

const Name = styled.h3`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;

const Price = styled.p`
  font-size: 0.8rem;
  color: #3c2f2f;
  font-weight: bold;
  margin: 0;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Rate = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #3c2f2f;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;

const Heart = styled(FiHeart)`
  color: orange;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
`;

const Dis = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Values = styled.div`
  display: grid;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;

const ProductCard = ({ item, dispatch, navigate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rate, setRate] = useState(item.rate || 0);
  const [total, setTotal] = useState(item.total || 0);

  const openModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const updateRating = async (newRate) => {
    const newTotal = total + 1;
    const newRateAvg = (rate * total + newRate) / newTotal;

    try {
      await axios.post('http://localhost:5176/api/update-data', { 
        itemId: item.item_name, // Assuming item_name is unique
        rate: newRateAvg, 
        total: newTotal 
      });

      // Update state locally
      setRate(newRateAvg);
      setTotal(newTotal);
      closeModal();
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  const truncateName = (name) => {
    return name.length > 5 ? `${name.substring(0, 5)}...` : name;
  };

  return (
    <Card
      onClick={() => {
        dispatch(setItems(item));  // Save item to Redux store
        navigate(`/item/${item.item_name}`);
      }}
    >
      <Image src={item.image_path} alt={item.item_name} />
      <Body>
        <Dis>
          <Name>{truncateName(item.item_name)}</Name>
          <Price>Birr {item.price.toFixed(2)}</Price>
        </Dis>
        <Values>
          <p style={{ display: 'flex', height: 'fit-content', margin: '0px', justifyContent: 'end' }}>
            <Rate>{rate.toFixed(1)} ⭐</Rate>
          </p>
          <p 
            style={{ display: 'flex', height: 'fit-content', margin: '0px', marginLeft: '-5px', justifyContent: 'end' }} 
            onClick={openModal}
          >
            <Heart />
          </p>
        </Values>
      </Body>

     {/* Rating Modal */}
{/* Rating Modal */}
<Modal 
  isOpen={modalIsOpen} 
  onRequestClose={closeModal} 
  ariaHideApp={false}
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '2rem',
      borderRadius: '10px',
      backgroundColor: '#f7f7f7',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      fontFamily: 'cursive' // Set font family for the modal content
    }
  }}
>
  {/* Custom Close Button */}
  <button 
    onClick={closeModal} 
    style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#333'
    }}
  >
    &times; {/* X symbol */}
  </button>

  <h2 style={{
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#333',
    fontFamily:"cursive"
  }}>
    Rate: <span style={{color:"#c4f" , fontFamily:"cursive"}}>{item.item_name}</span>
  </h2>

  <input 
    type="number" 
    min="1" 
    max="5" 
    value={rate} 
    onChange={(e) => setRate(Number(e.target.value))} 
    style={{
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px'
    }}
  />

  <div style={{
    display: 'flex',
    justifyContent: 'space-between'
  }}>
    <button 
      onClick={() => updateRating(rate)} 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontFamily:"cursive"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
    >
      Submit Rating
    </button>
  </div>
</Modal>

    </Card>
  );
};

export default ProductCard;
