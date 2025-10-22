// src/components/PostForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

interface PostFormProps {
  posts?: Post[];
  onSave: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ posts, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const existingPost = isEdit ? posts?.find(p => p.id === parseInt(id!)) : null;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    thumbnail: '',
    category: 'Công nghệ'
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    content: ''
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        author: existingPost.author,
        content: existingPost.content,
        thumbnail: existingPost.thumbnail,
        category: existingPost.category
      });
    }
  }, [existingPost]);

  const validate = () => {
    const newErrors = {
      title: '',
      author: '',
      content: ''
    };

    if (!formData.title || formData.title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }

    if (!formData.author || formData.author.length < 3) {
      newErrors.author = 'Tác giả phải có ít nhất 3 ký tự';
    }

    if (!formData.content || formData.content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.author && !newErrors.content;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const postData: Post = {
      id: isEdit && existingPost ? existingPost.id : Date.now(),
      title: formData.title,
      author: formData.author,
      content: formData.content,
      thumbnail: formData.thumbnail,
      category: formData.category,
      createdAt: isEdit && existingPost ? existingPost.createdAt : new Date().toLocaleDateString('vi-VN'),
      summary: formData.content.substring(0, 100) + '...'
    };

    onSave(postData);
    
    if (isEdit) {
      alert('Cập nhật thành công!');
      navigate(`/posts/${id}`);
    } else {
      alert('Đăng bài thành công!');
      navigate('/');
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333'
      }}>
        {isEdit ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Tiêu đề *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.title ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Nhập tiêu đề bài viết..."
          />
          {errors.title && (
            <span style={{ color: 'red', fontSize: '14px', marginTop: '5px', display: 'block' }}>
              {errors.title}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Tác giả *
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.author ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Nhập tên tác giả..."
          />
          {errors.author && (
            <span style={{ color: 'red', fontSize: '14px', marginTop: '5px', display: 'block' }}>
              {errors.author}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            URL ảnh thumbnail
          </label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Thể loại
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: 'white'
            }}
          >
            <option value="Công nghệ">Công nghệ</option>
            <option value="Du lịch">Du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Đời sống">Đời sống</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Nội dung *
          </label>
          <textarea
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.content ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            placeholder="Nhập nội dung bài viết..."
          />
          {errors.content && (
            <span style={{ color: 'red', fontSize: '14px', marginTop: '5px', display: 'block' }}>
              {errors.content}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate(isEdit ? `/posts/${id}` : '/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1,
              fontSize: '16px'
            }}
          >
            Hủy
          </button>
          
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1,
              fontSize: '16px'
            }}
          >
            {isEdit ? 'Cập nhật' : 'Đăng bài'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;