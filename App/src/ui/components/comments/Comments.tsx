import { useCallback, useEffect, useState } from "react";
import CommentsContainer from "../../styles/comments/Commets.styles";
import { api } from "../../../data/services/api";
import Answers from "../answers/Answers";
import { FaComment } from "react-icons/fa";
import { getUserIconByID } from "../../../data/services/getUserIconService";
import userIconDefault from "../../assets/user/user_icon.png";
import { CommentType } from "../../../data/@types/Comment/Comment.type";

const Comments: React.FC<{ postId: string }> = ({ postId }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [, setUserName] = useState<string | null>(null);
  const [userIcon, setUserIcon] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [answerOpen, setAnswerOpen] = useState<string[]>([]);

  const getCommentsForPost = useCallback(
    async (postId: string): Promise<CommentType[]> => {
      try {
        const response = await api.get<CommentType[]>(`/comments/${postId}`, {
          headers: {
            id: userId || "",
            Authorization: `Bearer ${token || ""}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    [userId, token]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("userToken");

        if (storedUserId && storedToken && postId) {
          setUserId(storedUserId);
          setToken(storedToken);

          const commentsForPost = await getCommentsForPost(postId);
          setComments(commentsForPost);

          try {
            const userResponse = await api.get(`/user/${storedUserId}`, {
              headers: {
                id: storedUserId,
                Authorization: `Bearer ${storedToken}`,
              },
            });

            if (userResponse.data && userResponse.data.user) {
              const userData = userResponse.data.user;
              setUserName(`${userData.first_name} ${userData.last_name}`);
            }

            const icon = await getUserIconByID(storedUserId);
            if (icon && icon.data) {
              setUserIcon(URL.createObjectURL(new Blob([icon.data])));
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId, getCommentsForPost]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      if (userId && token && postId) {
        const payload = {
          postid: postId,
          userid: userId,
          content: newComment,
          token: token,
          id: userId,
        };
        await api.post(`/comments-email`, payload, {
          headers: {
            id: userId,
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedComments = await getCommentsForPost(postId);
        setComments(updatedComments);

        setNewComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComments = (commentId: string) => {
    setAnswerOpen(
      answerOpen.includes(commentId)
        ? answerOpen.filter((id) => id !== commentId)
        : [...answerOpen, commentId]
    );
  };

  return (
    <CommentsContainer>
      <div className="comments w-100">
        <div className=" w-100 write d-flex align-items-center justify-content-between mb-3">
          <img src={userIcon || userIconDefault} alt="" />
          <input
            type="text"
            placeholder="Escreva um comentário"
            value={newComment}
            onChange={handleInputChange}
            maxLength={200}
            className="mx-2"
          />
          <button onClick={handleCommentSubmit}>Enviar</button>
        </div>

        {comments.map((comment) => (
          <div key={comment.commentid} className="comment mb-3">
            <div className="info d-flex flex-column p-2">
              <div className=" d-flex align-items-center mb-1">
                <img
                  src={userIcon || userIconDefault}
                  alt="UserIcon"
                  className="m-2"
                />
                <span className="m-2">{`${comment.author.first_name} ${comment.author.last_name}`}</span>
                <span className="date">
                  {formatCreatedAt(comment.createdAt)}
                </span>
              </div>

              <p>
                {comment.content.length > 200
                  ? `${comment.content.slice(0, 200)}...`
                  : comment.content}
              </p>
              {comment.content.length > 200 && (
                <span className="read-more">Ler mais</span>
              )}
<b></b>            </div>
            <div
              className="item"
              onClick={() => toggleComments(comment.commentid.toString())}
            >
              <FaComment />{" "}
              {answerOpen.includes(comment.commentid.toString())
                ? "Cancelar"
                : "Respostas"}
            </div>

            {answerOpen.includes(comment.commentid.toString()) && (
              <Answers commentId={comment.commentid.toString()} />
            )}
          </div>
        ))}
      </div>
    </CommentsContainer>
  );
};

const formatCreatedAt = (updatedAt: string) => {
  const date = new Date(updatedAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    timeZone: "America/Sao_Paulo",
  };
  return date.toLocaleDateString("pt-BR", options);
};

export default Comments;
