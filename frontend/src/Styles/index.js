import styled from "styled-components";

export const mainColor = "#736CED";
export const whiteColor = "white";

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "unset"};
  gap: ${(props) => props.gap || "0px"};
  justify-content: ${(props) => props.justifyContent || "unset"};
  align-items: ${(props) => props.alignItems || "unset"};
  width: ${(props) => props.width || "auto"};
  heigth: ${(props) => props.heigth || "auto"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  border: ${(props) => props.border || "unset"};
  border-radius: ${(props) => props.borderRadius || "0"};
`;
