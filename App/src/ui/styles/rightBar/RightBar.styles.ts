import styled from "styled-components";

const RightBarContainer = styled.aside`
  flex: 3;
  position: sticky;
  top: 65px;
  height: calc(100vh - 70px);
  overflow: scroll;
  background-color: ${(props) => props.theme.colors.background};

  @media (max-width: 768px), (max-width: 1024px) {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    padding: 20px;

    .item {
      box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
      padding: 20px;
      margin-bottom: 20px;
      background-color: ${(props) => props.theme.colors.background};
       

      span {
        color: gray;
      }

      .user {
        margin: 20px 0px;

        .userInfo {
          gap: 20px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .online {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: limegreen;
            top: 0;
            left: 30px;
          }

          p {
            color: #000;
          }

          span {
            font-weight: 500;
            color: ${(props) => props.theme.colors.text};;
          }
        }
      }
    }
  }
`;

export const TodoListContainer = styled.div`
  margin-bottom: 10px;

  h1 {
    margin: 0;
    font-size: 20px;
  }

  button {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
  }
`;

export const Line = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #000;
`;

export const Categorias = styled.div`
display:block;
padding:10px;
margin: 0% 10% 0% 10%;
`;

export const ContainetCategory = styled.div`

display:block;
padding: 10px;
`;

export default RightBarContainer;
