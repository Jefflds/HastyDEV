import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../data/context/AuthContext";
import Loader from "../Loader/Loader";
import { getUserData } from "../../../data/services/userService";
import { getUserIcon } from "../../../data/services/getUserIconService";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import LeftBarContainer from "../../styles/leftBar/LeftBar.styles";
import { UserDataTypes } from "../../../data/@types/UserData/UserData.type";

const LeftBar = () => {
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UserDataTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [userIcon, setUserIcon] = useState<string>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const user = await getUserData();
      setUserData(user);
      const icon = await getUserIcon();
      setUserIcon(icon);

    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <LeftBarContainer className="position-sticky">
        <div className="leftBar">
          <div className="container">
            <div className="menu d-flex flex-column ">
              <div className="user d-flex align-items-center">
                <Link to="/perfil">
                  <img src={userIcon} alt="" />
                </Link>
                <span className="text-capitalize">
                  {userData
                    ? `${userData.first_name} ${userData.last_name}`
                    : "Usuário"}
                </span>
              </div>
            </div>
            <hr />
            <div className="menu d-flex flex-column ">
              <span>Painel</span>
              {userData?.role !== "user" && (
                <div className="item d-flex align-items-center">
                  <Link to="/createpost">
                    <AiOutlinePlusCircle className="plus-circle" />
                  </Link>
                  <span>Criar Post</span>
                </div>
              )}
              <div className="item d-flex align-items-center">
                <img src={Gaming} alt="" />
                <span>Dashboard</span>
              </div>
              <div className="item d-flex align-items-center">
                <img src={Gallery} alt="" />
                <span>Projetos Concluídos</span>
              </div>
              <div className="item d-flex align-items-center">
                <img src={Videos} alt="" />
                <span>Recompensas</span>
              </div>
              <div className="item d-flex align-items-center">
                <img src={Messages} alt="" />
                <span>Lista de Favoritos</span>
              </div>
            </div>
            <hr />
            <div className="menu d-flex flex-column mt-3">
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </LeftBarContainer>
    </>
  );

};

export default LeftBar;
