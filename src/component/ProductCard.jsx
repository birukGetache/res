import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FiHeart } from 'react-icons/fi';
import { setItems } from '../itemsReducer';
import Modal from 'react-modal';
import axios from 'axios';
import localForage from 'localforage';
localForage.config({
  driver: localForage.LOCALSTORAGE, 
  name: 'myApp',
  storeName: 'data',
  description: 'Some description'
});
import data from '../data.json'

const Card = styled.div`
  border: none;
  border-radius: 8px;
  height:200px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0.5, 0.5, 0.5, 0.5);
  text-align: center;
  justify-content:space-between;
`;

const Image = styled.img`
  width: 35vw;
  height: 50%;
  border-radius: 8px;
  object-fit:cover;
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
  box-shadow: 0 4px 16px -2px  rgba(0, 0, 0, 0.3);
  border-radius:5px;
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
  border: 1px solid yellow;
  color: transparent;
  font-size: 2rem; /* Adjust the size of the heart icon */
  font-family: "Poppins", sans-serif;
`;

const Dis = styled.div`
height:100%;
 display:flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Values = styled.div`
  display: grid;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items:center;
`;

const ProductCard = ({ item, dispatch, navigate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState(0);
  const openModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);
  const set = async(rate, total, name,value) =>{
    console.log(rate)
    console.log(total)
    //update total
    total= total+1;
      const temp = rate*total;
     const final= temp + value;
     rate = final/total;
     console.log(rate , total);
     try {
      console.log(rate, total);
     const t= await axios.post('http://localhost:5176/api/update-data', { rate: rate, total: total });
      console.log(t);
    } catch (error) {
      console.error('Failed to update data:', error);
    }
     //update rate
    closeModal();
  }
  const truncateName = (name) => {
    return name.length > 9 ? `${name.substring(0, 9)}...` : name;
  };
  
  return (
    <div>
      <Card
        onClick={() => {
          dispatch(setItems(item));
          navigate(`/item/${item.Name}`);
        }}
      >
        <Image src={item.ImagePath} alt={item.Name} />
        <Body>
          <Dis>
            <Title>{item.Type}</Title>
            <Name>{truncateName(item.Name)}</Name>
            <Price>Birr{item.Price.toFixed(2)}</Price>
          </Dis>
          <Values>
            <p style={{ display: "flex", height: "fit-content", margin: "0px", justifyContent: "end" }}>
              <span style={{ display: "flex" }}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                      fill="#ff9633"
                    ></path>
                  </g>
                </svg>
                <Rate>{item.Rate}</Rate>
              </span>
            </p>
            <p style={{ display: "flex", height: "fit-content", margin: "0px", marginLeft: "-5px;", justifyContent: "end" }} onClick={openModal}>
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </p>
          </Values>
        </Body>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            color: 'lightsteelblue',
            width: '60%',
            height:"40px",
            margin: 'auto',
            marginLeft:"7%",
            padding: '10px',
            borderRadius: '10px',
          },
          position:"relative"
        }}
      >
         <svg onClick={()=>set(item.Rate,item.total,item.Name,1)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <svg onClick={()=>set(item.Rate,item.total,item.Name,2)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <svg onClick={()=>set(item.Rate,item.total,item.Name,3)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <svg onClick={()=>set(item.Rate,item.total,item.Name,4)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <svg onClick={()=>set(item.Rate,item.total,item.Name,5)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3c2f2f">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                    stroke="#3c2f2f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
        <button onClick={closeModal}  style={{background:"none", color:"#ca8a71" , border:"none", position:'absolute', fontWeight:"bold" , fontSize:"25px" , top:"5px" , right:"5px"}}>&times;</button>
      </Modal>
    </div>
  );
};

export default ProductCard;
