/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import ProductCard from './ProductCard'; // Adjust path as needed
import data from '../data.json';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  overflow-y: auto;
  width: 100vw;
`;

const Hr = styled.hr`
  border: 0;
  height: 5px;
  background: linear-gradient(to right, #CA8A71, #CA8A71 50%, #CA8A71 50%);
  margin: 20px 0;
  width: 90%;
  margin: auto;
  margin-top: 20px;
  border-radius: 2px;
  box-shadow: 10px 10px 20px rgba(0.1, 0.1, 0.1, 0.15);
`;

const Who = styled.p`
  font-size: 1rem;
  text-align: center;
  font-family: "Dosis", sans-serif;
`;

const Cards = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.tabs.activeTab);

  const filteredItems = Object.keys(data)
    .filter((category) => activeTab === "All" || activeTab === category)
    .flatMap((category) => {
      const items = data[category].filter(
        (item) =>
          searchQuery === '' || item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Limit to 2 items per category if "All" is active
      return activeTab === "All" ? items.slice(0, 2) : items;
    });

  return (
    <>
      <Container>
        {filteredItems.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            dispatch={dispatch}
            navigate={navigate}
          />
        ))}
      </Container>
      <Hr />
      <Who>
        Designed by <span style={{ color: '#209acd', fontFamily: "Dosis", fontWeight: "bold" }}>SAFEWARE</span>
      </Who>
    </>
  );
};

export default Cards;
