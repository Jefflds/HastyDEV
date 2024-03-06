import styled from 'styled-components';

const RightBarContainer = styled.div`
  flex: 3;
  position: sticky;
  top: 65px;
  height: calc(100vh - 70px);
  overflow: scroll;
  background-color: #fff;


  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
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
      background-color: #fff;

      span {
        color: gray;
      }

      .user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0px;

        .userInfo {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;

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
            position: absolute;
            top: 0;
            left: 30px;
          }

          p {
            color: #000;
          }

          span {
            font-weight: 500;
            color: #000;
          }
        }

        .buttons {
          display: flex;
          align-items: center;
          gap: 10px;

          button {
            border: none;
            padding: 5px;
            color: white;
            cursor: pointer;

            &:first-child {
              background-color: #5271ff;
            }

            &:last-child {
              background-color: #f0544f;
            }
          }
        }
      }
    }
  }
`;

export default RightBarContainer;
