import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 900px;
  .card {
    height: 100%;
    background: ${(props) => props.theme.colors.background};
    border: none;
  }

  .profileImageContainer {
    margin-top: 10px;
    width: 170px;
    height: 170px;
    margin-bottom: 35px;
  }

  .profileImage {
    border-radius: 50%;
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.329);
    object-fit: cover;
  }

  .social-links {
    margin-bottom: 20px;
  }

  .social-links a {
    margin-right: 10px;
    color: ${(props) => props.theme.colors.text};
    font-size: 24px;
  }

  .about-me, .contacts {
    background: ${(props) => props.theme.colors.post_background};
    border: 2px solid ${(props) => props.theme.colors.post_border};
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};

  }

  .about-me h2, .contacts h2 {
    margin-bottom: 10px;
  }

  .about-me p, .contacts p {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    .profileImageContainer {
      width: 120px;
      height: 120px;
    }

    .profileImage {
      width: 100%;
      height: 100%;
    }

    .social-links a {
      font-size: 20px;
    }
  }


  h1{

    color: ${(props) => props.theme.colors.text};

  }
`;
export default ProfileContainer;
