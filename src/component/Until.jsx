/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { space, layout, color } from 'styled-system';
import cake from '../assets/cake.png';
import choko from '../assets/choko (2).png';

const Box = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #FF939B, #CA8A71);
  ${space}
  ${layout}
  ${color}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:50%;
`;

const P = styled.p`
  color: white;
  font-size: 80px;
  font-family: "Dosis", sans-serif;
  display: block;
  margin: 10px;
  font-weight: bold;
`;

const CakePic = styled.div`
  position: relative;
  overflow: hidden; 
  height: 50%; /* Make the container height 0 to push images to the bottom */
`;

const H = styled.h6`
  margin: 0;
  margin-top:-20px;
  font-family: "East Sea Dokdo", sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

const I = styled.img`
  height: 300px;
  position: absolute;
  bottom: -70px;
  left: -80px;
  overflow-y:hidden;
`;

const I2 = styled.img`
  height: 200px;
  position: absolute;
  bottom: -50px;
  left: 50px;
   overflow-y:hidden;
`;

const Until = () => {
  return (
    <Box>
      <Name>
        <P>KIKO</P>
        <H>pastry</H>
      </Name>
      <CakePic>
        <I2 src={choko} />
        <I src={cake} />
      </CakePic>
    </Box>
  );
};

export default Until;
