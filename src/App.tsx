// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import './App.css';

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

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Thoughts on Lifestyle & Mental Health - Inner Pieces',
    author: 'Admin',
    content: 'Trong cuộc sống hiện đại ngày nay, việc giữ gìn sức khỏe tinh thần và cân bằng cuộc sống là vô cùng quan trọng. Bài viết này chia sẻ những suy nghĩ và kinh nghiệm về lối sống lành mạnh và chăm sóc sức khỏe tâm lý.',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop',
    category: 'Lifestyle',
    createdAt: '22/10/2024',
    summary: 'Trong cuộc sống hiện đại ngày nay, việc giữ gìn sức khỏe tinh thần và cân bằng cuộc sống là vô cùng quan trọng...'
  },
  {
    id: 2,
    title: 'Khám phá bộ sưu tập giao diện Blogger chuyên nghiệp',
    author: 'Design Team',
    content: 'Chúng tôi tự hào giới thiệu bộ sưu tập giao diện Blogger đa dạng, hiện đại và tối ưu SEO. Mỗi template được thiết kế tỉ mỉ với trải nghiệm người dùng tuyệt vời và khả năng tùy biến cao.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    category: 'Design',
    createdAt: '21/10/2024',
    summary: 'Chúng tôi tự hào giới thiệu bộ sưu tập giao diện Blogger đa dạng, hiện đại và tối ưu SEO...'
  },
  {
    id: 3,
    title: 'Giao Diện Website - Bộ sưu tập chuyên nghiệp',
    author: 'Web Developer',
    content: 'Khám phá bộ sưu tập giao diện website chuyên nghiệp cho mọi lĩnh vực: bán hàng, bất động sản, công ty, dịch vụ, tạp chí và landing page. Mỗi template được tối ưu cho trải nghiệm người dùng.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    category: 'Web Design',
    createdAt: '20/10/2024',
    summary: 'Khám phá bộ sưu tập giao diện website chuyên nghiệp cho mọi lĩnh vực: bán hàng, bất động sản...'
  },
  {
    id: 4,
    title: 'React Hooks: Từ cơ bản đến nâng cao',
    author: 'Nguyễn Văn A',
    content: 'React Hooks là một tính năng mới được giới thiệu trong React 16.8. Chúng cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class. Trong bài viết này, chúng ta sẽ tìm hiểu về các hooks cơ bản như useState, useEffect và các hooks nâng cao khác.',
    thumbnail: 'https://via.placeholder.com/400x250/007bff/ffffff?text=React+Hooks',
    category: 'Công nghệ',
    createdAt: '15/03/2024',
    summary: 'React Hooks là một tính năng mới được giới thiệu trong React 16.8. Chúng cho phép bạn sử dụng state và các tính năng khác...'
  },
  {
    id: 5,
    title: 'Khám phá vẻ đẹp của Hạ Long',
    author: 'Trần Thị B',
    content: 'Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới được UNESCO công nhận. Với hàng nghìn hòn đảo đá vôi nhấp nhô trên mặt nước xanh ngọc, Hạ Long mang đến một khung cảnh tuyệt đẹp mà bất kỳ du khách nào cũng nên trải nghiệm ít nhất một lần trong đời.',
    thumbnail: 'https://via.placeholder.com/400x250/28a745/ffffff?text=Ha+Long',
    category: 'Du lịch',
    createdAt: '14/03/2024',
    summary: 'Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới được UNESCO công nhận. Với hàng nghìn hòn đảo đá vôi...'
  },
  {
    id: 6,
    title: 'Bí quyết pha cà phê ngon tại nhà',
    author: 'Lê Văn C',
    content: 'Pha cà phê ngon không chỉ phụ thuộc vào chất lượng hạt cà phê mà còn ở kỹ thuật pha chế. Trong bài viết này, tôi sẽ hướng dẫn bạn các bước cơ bản để có thể pha được một ly cà phê thơm ngon ngay tại nhà với những dụng cụ đơn giản.',
    thumbnail: 'https://via.placeholder.com/400x250/dc3545/ffffff?text=Coffee',
    category: 'Ẩm thực',
    createdAt: '13/03/2024',
    summary: 'Pha cà phê ngon không chỉ phụ thuộc vào chất lượng hạt cà phê mà còn ở kỹ thuật pha chế. Trong bài viết này...'
  }
];

function App() {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<PostList posts={posts} onDelete={deletePost} />} />
            <Route path="/posts" element={<PostList posts={posts} onDelete={deletePost} />} />
            <Route path="/create" element={<PostForm onSave={addPost} />} />
            <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={deletePost} />} />
            <Route path="/posts/edit/:id" element={<PostForm posts={posts} onSave={updatePost} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;