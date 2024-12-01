// ItemPage.js
import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Arrow = styled(FaArrowLeft)`
  margin: 10px;
  font-size: 30px;
  font-weight: bold;
  display:block;
`;
const Image = styled.img`
width:80%;
margin:auto;
height:auto;
border-radius:50px;`
const ImageContainer = styled.div`
display:flex;
justify-content:center;
align-item:center;
`
const P = styled.p`
 font-family: "Poppins", sans-serif;
 padding-left:20px;
 font-weight:bold;
 font-size:20px;
  color:#3c2f2f;
 `
 const P3 = styled.div`
 font-family: "Poppins", sans-serif;
 padding-left: 20px;
 font-size: 20px;
 color: #6a6a6a;
 flex: 1 1 45%;
 white-space: pre-wrap; /* Ensures that whitespace is preserved, and text wraps */
 word-wrap: break-word; /* Ensures that long words will wrap to the next line */
`;
 const Star = styled(FaStar)`
 margin-left:20px;
 color:orange;
 font-size:25px;
 `
 const Pdis = styled.p`
  font-family: "Poppins", sans-serif;
 padding:0 0 0 20px;
 font-size:20px;
 display:inline;
 margin:0;
 text-align:start;
 color:#3c2f2f;
 `
 const Span = styled.span`
 font-family: "Poppins", sans-serif;
 margin: 20px auto;
 margin-top:70px;
 font-size:30px;
background-color:#CA8A71;
 border-radius:10px;
 color:white;
 padding:10px 50px ;

 `
 const Hr = styled.hr`
  border: 0;
  height: 5px;
  background: linear-gradient(to right, #CA8A71, #CA8A71 50%, #CA8A71 50%);
  margin: 20px 0;
  width:90%;
  margin:auto;
  border-radius:2px;
  box-shadow: 10px 10px 20px rgba(0.1, 0.1, 0.1, 0.15); 
`;

const Who = styled.p`
  font-size: 1rem;
  text-align:center;
 font-family: "Poppins", sans-serif;
`
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
  flex-grow: 1;
`;
const ItemPage = () => {
  const navigate = useNavigate();
  const items = useSelector(state => state.items.item);
  const { name } = useParams();

  return (
    <>
      <Arrow onClick={() => navigate("/")}></Arrow>
      <ImageContainer>
      <Image src={items.ImagePath} alt='cake'></Image>
      </ImageContainer>
    <P>{items.Name}</P>
    <div style={{display:'flex'}}>
    <Star></Star> <Pdis>{items.Rate} - 2 mins</Pdis> 
    </div>

    <P3>{items.detail}</P3>
 <div style={{display:"flex", justifyContent:"center" }}><Span>{items.Price} Birr</Span></div> 
 <Container>
 <Hr></Hr>
    <Who>
    Designed by <span style={{color: '#209acd',fontFamily: "Poppins", }}>SAFEWARE</span>
  </Who>
 </Container>

    </>
  );
};

export default ItemPage;
