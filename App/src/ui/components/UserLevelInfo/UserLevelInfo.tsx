import Loader from "../Loader/Loader";
import UserLevelInfoContainer from "../../styles/UserLevelInfo/UserLevelInfo.styles";
import { ProgressBar } from "react-bootstrap";
import { useUserLevelInfo } from "./useUserLevelInfo";


const UserLevelInfo = () => {
  const { loading, userData, userIcon } = useUserLevelInfo();
  return (
    <>
      {loading && <Loader />}
      <UserLevelInfoContainer>
        <div className="item">
          <span className="fw-bold fs-5">Seu Nível</span>
          {userData?.level && (
            <div className="user">
              <div className="userInfo d-flex align-items-center">
                <img src={userIcon} alt="" />
                <div className="d-flex w-100 justify-content-between">
                  <span className="username">{userData?.username}</span>
                  <span className="bg-success text-white rounded-2 px-4 py-1">{`${userData?.level.level} Lvl`}</span>
                </div>
              </div>
              <div className="level d-flex flex-column">
                <span className="my-2 fw-semibold ">{`XP ${userData?.level.exp}/${userData?.level.expNeeded}`}</span>
                <ProgressBar
                  now={Number(userData?.level.exp)}
                  max={Number(userData?.level.expNeeded)}
                  variant="success"
                  animated
                />
              </div>
            </div>
          )}

        </div>
      </UserLevelInfoContainer>
    </>
  );
};

export default UserLevelInfo;
