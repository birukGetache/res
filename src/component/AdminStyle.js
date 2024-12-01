// AdminStyles.js
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa';
// Basic container with padding
export const Container = styled.div`
display: flex;
 flex-wrap: wrap;
    justify-content: center; /* Center items in their grid cells */
            align-items: center;
    gap: 10px; /* Optional */
    width:1440px;
    max-width:80%;
   font-family: cursive;
   margin:auto;

`;

// Header with margin and font size
export const Header = styled.h1`
  margin-bottom: 16px;
  font-size: 24px;
  color: #333;
   font-family: cursive;
   text-align:center;
`;

export const Buttonx = styled.button`
position:absolute;
top:10px;
color:red;
right:10px;
font-size:40px;
  background: none; /* No background */
  border: none; /* No border */
  border-radius: 4px; /* Add some border-radius for button appearance */
  padding: 10px 20px; /* Add some padding for spacing */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background 0.3s ease; /* Smooth transition for background change */
`;
export const Delete = styled(FaTrash)`
position:absolute;
right:10px;
color:red;
cursor:pointer;
top:10px;
`
// Button styling
export const Button = styled.button`
margin:10px;
 font-family: cursive;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Container for each item
export const ItemContainer = styled.div`
position:relative;
   background-color:#ccc;
display:grid;
 font-family: cursive;
 place-items:center;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

// Input field styling
export const Input = styled.input`
 font-family: cursive;
margin:10px;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 80%;
  margin-bottom: 12px;
`;

// Textarea styling
export const Textarea = styled.textarea`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
   font-family: cursive;
  margin-bottom: 12px;
  resize: vertical;
`;

// Image styling
export const Image = styled.img`
  border-radius: 4px;
  margin-bottom: 12px;
  width: 250px;
  height: 250px;
   font-family: cursive;
`;
