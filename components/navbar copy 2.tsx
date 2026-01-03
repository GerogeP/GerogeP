'use client'

import NextLink from "next/link";

import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav style={{
      display: 'table !important',
      width: '100% !important',
      // tableLayout: 'fixed !important',
      height: '80px !important',
      borderBottom: '1px solid #e2e8f0 !important',
      backgroundColor: 'white !important',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05) !important',
      position: 'relative',
      zIndex: 1000
    }}>
      
      {/* 左侧 Logo */}
      <div style={{
        display: 'table-cell !important',
        width: '200px !important',
        verticalAlign: 'middle !important',
        paddingLeft: '24px !important',
        textAlign: 'left' as any
      }}>
        <h1 style={{ 
          fontSize: '20px !important', 
          fontWeight: 'bold !important', 
          color: '#1e293b !important',
          margin: 0,
          lineHeight: '1.2'
        }}>Tutor Portal</h1>
      </div>

      {/* 中间导航链接 - 横向排列 */}
      <div style={{
        display: 'table-cell !important',
        width: 'auto !important',
        verticalAlign: 'middle !important',
        textAlign: 'center' as any,
        paddingLeft: '24px !important',
        paddingRight: '24px !important'
      }}>
        <NextLink 
          href="/dashboard"
          style={{
            display: 'inline-block !important',
            padding: '8px 16px !important',
            marginRight: '16px !important',
            color: '#475569 !important',
            textDecoration: 'none !important',
            borderRadius: '6px !important',
            transition: 'all 0.2s !important',
            fontWeight: '500 !important',
            whiteSpace: 'nowrap !important'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563eb';
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Dashboard
        </NextLink>

        <NextLink 
          href="/login"
          style={{
            display: 'inline-block !important',
            padding: '8px 16px !important',
            color: '#475569 !important',
            textDecoration: 'none !important',
            borderRadius: '6px !important',
            transition: 'all 0.2s !important',
            fontWeight: '500 !important',
            whiteSpace: 'nowrap !important'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563eb';
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Login
        </NextLink>
      </div>

      {/* 右侧登录按钮 */}
      <div style={{
        display: 'table-cell !important',
        width: '120px !important',
        verticalAlign: 'middle !important',
        paddingRight: '24px !important',
        textAlign: 'right'
      }}>
        {pathname !== '/login' && (
          <NextLink 
            href="/login"
            style={{
              display: 'inline-block !important',
              padding: '8px 16px !important',
              backgroundColor: '#2563eb !important',
              color: 'white !important',
              textDecoration: 'none !important',
              borderRadius: '6px !important',
              transition: 'all 0.2s !important',
              fontWeight: '500 !important',
              whiteSpace: 'nowrap !important'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            登录
          </NextLink>
        )}
      </div>
    </nav>
  );
};
