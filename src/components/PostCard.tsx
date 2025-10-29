
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  summary: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <div className="post-image">
        <img src={post.thumbnail} alt={post.title} />
        <div className="category-badge">{post.category}</div>
      </div>
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="author">👤 {post.author}</span>
          <span className="date">📅 {post.createdAt}</span>
        </div>
        <p className="post-summary">{post.summary}</p>
        <div className="post-actions">
          <button 
            onClick={() => navigate(`/posts/${post.id}`)}
            className="btn read-more"
          >
            Đọc thêm
          </button>
          <div className="action-buttons">
            <button 
              onClick={() => navigate(`/posts/edit/${post.id}`)}
              className="btn edit"
            >
              Viết
            </button>
            <button 
              onClick={handleDelete}
              className="btn delete"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
