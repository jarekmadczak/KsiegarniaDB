import styled from "styled-components";

const StyledDiv = styled.div`
   margin-bottom: 10vh;
  margin-top: 10vh;  // Increased margin-top to 10vh
  margin-left: 5vw;  // Reduced margin-left to 5vw for smaller spacing
  margin-right: 5vw; // Reduced margin-right to 5vw for smaller spacing
  padding: 0 10px;   // Keep the padding as is
  text-allign: center;
`;

export default function Center({ children }) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}
