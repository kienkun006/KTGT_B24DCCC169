
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: 'white',
    textDecoration: 'none' as const,
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: isActive ? '#007bff' : 'transparent'
  });

  const getCreateButtonStyle = ({ isActive }: { isActive: boolean }) => ({
    color: 'white',
    textDecoration: 'none' as const,
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: isActive ? '#0056b3' : '#007bff'
  });

  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
          MyBlog
        </NavLink>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <NavLink to="/" style={getNavLinkStyle}>
          Trang chủ
        </NavLink>
        
        <NavLink to="/create" style={getCreateButtonStyle}>
          Viết bài mới
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;