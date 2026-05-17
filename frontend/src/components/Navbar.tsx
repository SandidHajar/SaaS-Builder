'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { LogOut, LayoutDashboard, PlusCircle, User as UserIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(2, 6, 23, 0.7)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(16px)',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.2rem',
          }}>A</div>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
          }}>
            SaaS Builder
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link href="/projects/new" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlusCircle size={18} /> New Project
              </Link>
              <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name || 'User'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pro Plan</div>
                </div>
                <button 
                  onClick={logout}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px', 
                    padding: '8px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>
                Sign In
              </Link>
              <Link href="/register" className="btn-gradient" style={{ padding: '10px 20px', borderRadius: '10px' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
