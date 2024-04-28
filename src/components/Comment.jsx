import React from "react";
import styles from "./Comment.module.css";

export default function Comment({
  username,
  avatar,
  content,
  createdAt,
  score,
  replies = [],
  reply,
  input,
  replyVisibility,
  ...props
}) {
  const [voteCount, setVoteCount] = React.useState(0);
  const [replyText, setReplyText] = React.useState('')

  const handleUpvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount + 1);
  };

  const handleDownvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount - 1);
  };

  const handleSubmit = () => {
    console.log("Reply submitted:", replyText);

    setReplyText("");
    setReplyVisible(false);
  };
  return (
    <>
      <div className={styles.commentCard}>
        <div className={styles.votes}>
          <button onClick={handleUpvote}>+</button>
          <div>{score + voteCount}</div>
          <button onClick={handleDownvote}>-</button>
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.commentInfoTitle}>
            <img
              src={avatar}
              className={styles.avatar}
              alt={username}
            />
            <p>
              {username} <span>{createdAt}</span>
            </p>
            <button onClick={reply}>reply</button>
          </div>

          <p>{content}</p>
        </div>
      </div>
      {replyVisibility && (
        <div>
          <textarea
            value={replyText}
            onChange={input}
            placeholder="Write a reply..."
          />
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      )}
      {replies.length > 0 && (
        <div className={styles.repliesContainer}>
          <h3>Replies</h3>
          <div className={styles.repliesWrapper}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              username={reply.user.username}
              avatar={reply.user.image.png}
              content={reply.content}
              createdAt={reply.createdAt}
              score={reply.score}
              replies={reply.replies}
              />
          ))}
          </div>
        </div>
      )}
    </>
  );
}
