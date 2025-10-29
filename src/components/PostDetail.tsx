
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

interface PostDetailProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = posts.find(p => p.id === parseInt(id!));

  if (!post) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '40px'
      }}>
        <h2 style={{ color: '#666', marginBottom: '20px' }}>
          Bài viết không tồn tại
        </h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
      navigate('/');
    }
  };

  return (
    <div className="post-detail">
      <div className="post-detail-actions">
        <button 
          onClick={() => navigate('/')}
          className="btn back"
        >
          ← Quay lại
        </button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate(`/posts/edit/${post.id}`)}
            className="btn edit"
          >
            Chỉnh sửa
          </button>
          
          <button 
            onClick={handleDelete}
            className="btn delete"
          >
            Xóa bài viết
          </button>
        </div>
      </div>

      <article className="post-detail-content">
        <h1>{post.title}</h1>
        
        <div className="post-meta">
          <span className="author">Tác giả: {post.author}</span>
          <span className="date">Ngày đăng: {post.createdAt}</span>
          <span className="category">Thể loại: {post.category}</span>
        </div>

        {post.thumbnail && (
          <img src={post.thumbnail} alt={post.title} className="post-image" />
        )}

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
