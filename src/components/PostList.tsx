// src/components/PostList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

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

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Lifestyle', 'Design', 'Web Design', 'Technology', 'Health', 'Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                         post.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Inner Pieces</h1>
          <p className="hero-subtitle">Thoughts on Lifestyle & Mental Health</p>
          <div className="hero-actions">
            <button 
              onClick={() => navigate('/create')}
              className="hero-btn primary"
            >
              Bắt đầu viết blog
            </button>
            <button className="hero-btn secondary">
              Khám phá thêm
            </button>
          </div>
        </div>
      </section>

      {/* Blog Stats */}
      <div className="blog-stats">
        <div className="stat-item">
          <span className="stat-number">{posts.length}</span>
          <span className="stat-label">Bài viết</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{new Set(posts.map(p => p.author)).size}</span>
          <span className="stat-label">Tác giả</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{new Set(posts.map(p => p.category)).size}</span>
          <span className="stat-label">Chuyên mục</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <section className="posts-section">
        <h2 className="section-title">Bài viết</h2>
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={onDelete}
            />
          ))}
        </div>
      </section>

      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <div className="no-posts-icon">📝</div>
          <h3>Không tìm thấy bài viết nào</h3>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc chuyên mục</p>
          <button 
            onClick={() => navigate('/create')}
            className="create-first-post"
          >
            Viết bài đầu tiên
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;