import styled from "styled-components";

export const PostContainer = styled.div`
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.38);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.38);
  border-radius: 5px;
  margin-top: 20px;
  border: 2px solid ${(props) => props.theme.colors.post_border};
  background-color: ${(props) => props.theme.colors.post_background};
  color: ${(props) => props.theme.colors.text};

  .LerMais{
    color: ${(props) => props.theme.colors.text};

  }

  & .text-capitalize {
    text-transform: capitalize;
  }

  & .fw-bold {
    font-weight: bold;
  }

  & .fw-medium {
    font-weight: 500;
  }

  & .rounded-circle {
    border-radius: 50%;
  }

  & .loading-icon {
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const BussinessDataContainer = styled.div`
  div {
    gap: 10px;
  }
  img {
    max-width: 50px;
  }
`;

export const LikeContainer = styled.button`
  background: none;
  border: none;
  outline: none;
  gap: 10px;
  color: ${(props) => props.theme.colors.text};
`;

export const CommentContainer = styled.button`
  background: none;
  border: none;
  outline: none;
  gap: 10px;
  color: ${(props) => props.theme.colors.text};
`;



export default PostContainer;
