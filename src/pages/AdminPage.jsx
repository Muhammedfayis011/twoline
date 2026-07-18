import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function AdminPage() {
  const { isAr } = useLanguage();
  const navigate = useNavigate();
  
  // Auth states
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Tab state: 'inquiries' | 'projects'
  const [activeTab, setActiveTab] = useState('inquiries');

  // Inquiries database state
  const [inquiries, setInquiries] = useState([]);

  // Projects database state (Completed Works)
  const [projects, setProjects] = useState([]);

  // Form states for adding new completed work
  const [projCategory, setProjCategory] = useState('curtains');
  const [projLocEn, setProjLocEn] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  // Check existing session auth on load
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    // Load Inquiries
    const savedInqs = localStorage.getItem('twoline_inquiries');
    if (savedInqs) {
      try {
        setInquiries(JSON.parse(savedInqs));
      } catch (e) {
        setInquiries([]);
      }
    }

    // Load Projects
    const savedProjs = localStorage.getItem('twoline_completed_works');
    if (savedProjs) {
      try {
        setProjects(JSON.parse(savedProjs));
      } catch (e) {
        setProjects([]);
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId.trim() === 'twoline' && password === 'two12345') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError(false);
      loadData();
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUserId('');
    setPassword('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new project manually
  const handleAddProject = (e) => {
    e.preventDefault();
    
    // Choose default showcase image based on category if no custom upload is provided
    let defaultImg = '/images/sheer.png';
    if (projCategory === 'blinds') defaultImg = '/images/zebra.png';
    else if (projCategory === 'sofa') defaultImg = '/images/sofa_velvet.png';
    else if (projCategory === 'carpet') defaultImg = '/images/carpet_silk.png';
    else if (projCategory === 'wallpaper') defaultImg = '/images/wallpaper_silk.png';

    // Generate default titles based on category
    let titleEn = 'Curtains Installation';
    let titleAr = 'تركيب وتفصيل ستائر شيفون';
    if (projCategory === 'blinds') {
      titleEn = 'Premium Blinds Installation';
      titleAr = 'تركيب وتفصيل البلايند';
    } else if (projCategory === 'sofa') {
      titleEn = 'Custom Sofa & Majlis Upholstery';
      titleAr = 'تفصيل وتنجيد الكنب والمجالس';
    } else if (projCategory === 'carpet') {
      titleEn = 'Premium Carpet Fitting';
      titleAr = 'تركيب وتفصيل السجاد والموكيت';
    } else if (projCategory === 'wallpaper') {
      titleEn = 'Luxury Wallpaper Installation';
      titleAr = 'تركيب ورق جدران فاخر';
    }

    // Formulate Arabic location fallback based on English input
    let locAr = projLocEn || 'دبي، الإمارات';
    const lowerLoc = (projLocEn || '').toLowerCase();
    if (lowerLoc.includes('abu dhabi')) {
      locAr = 'أبوظبي';
      if (lowerLoc.includes('al bahia') || lowerLoc.includes('bahia')) locAr = 'فيلا الباهية، أبوظبي';
      else if (lowerLoc.includes('yas')) locAr = 'جزيرة ياس، أبوظبي';
      else if (lowerLoc.includes('saadiyat')) locAr = 'جزيرة السعديات، أبوظبي';
      else if (lowerLoc.includes('khalifa')) locAr = 'مدينة خليفة، أبوظبي';
    } else if (lowerLoc.includes('dubai')) {
      locAr = 'دبي';
      if (lowerLoc.includes('marina')) locAr = 'مرسى دبي، دبي';
      else if (lowerLoc.includes('palm')) locAr = 'نخلة جميرا، دبي';
      else if (lowerLoc.includes('jumeirah')) locAr = 'جميرا، دبي';
      else if (lowerLoc.includes('downtown')) locAr = 'وسط مدينة دبي';
      else if (lowerLoc.includes('ranches')) locAr = 'المرابع العربية، دبي';
    } else if (lowerLoc.includes('sharjah')) {
      locAr = 'الشارقة';
    } else if (lowerLoc.includes('ajman')) {
      locAr = 'عجمان';
    }

    const newProj = {
      id: Date.now(),
      category: projCategory,
      titleEn,
      titleAr,
      locationEn: projLocEn || 'Dubai, UAE',
      locationAr: locAr,
      image: uploadedImage || defaultImg
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem('twoline_completed_works', JSON.stringify(updated));

    // Reset Form fields
    setProjLocEn('');
    setUploadedImage('');
    
    // Clear file inputs on page
    const fileInput = document.getElementById('project-image-file');
    if (fileInput) fileInput.value = '';
  };

  // Delete a project
  const handleDeleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('twoline_completed_works', JSON.stringify(updated));
  };

  // Clear all inquiries
  const handleClearInquiries = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح جميع السجلات؟' : 'Are you sure you want to clear all inquiries?')) {
      localStorage.setItem('twoline_inquiries', JSON.stringify([]));
      setInquiries([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <main style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 24,
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)'
      }}>
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: 400,
          padding: 32,
          boxShadow: 'var(--shadow-xl)',
          animation: loginError ? 'shake 0.4s ease' : 'pagePop 0.35s ease'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              🔑 {isAr ? 'بوابة المسؤول' : 'Admin Login'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>
              Two Line Furniture Control Panel
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {isAr ? 'معرف المستخدم' : 'User ID'}
              </label>
              <input 
                type="text" 
                required
                placeholder="Enter User ID"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--surface)',
                  fontSize: '0.9rem',
                  color: 'var(--text)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--surface)',
                  fontSize: '0.9rem',
                  color: 'var(--text)'
                }}
              />
            </div>

            {loginError && (
              <p style={{ color: 'var(--error, #EF4444)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600 }}>
                ❌ {isAr ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials, try again.'}
              </p>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              🔓 {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 48, paddingBottom: 96, background: 'var(--surface)' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 16,
          borderBottom: '1px solid var(--border)',
          paddingBottom: 24,
          marginBottom: 32 
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
              ⚙️ {isAr ? 'لوحة تحكم المسؤول' : 'Admin Control Center'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {isAr ? 'إدارة الطلبات المخصصة وأعمال التنجيد والتركيبات المنجزة.' : 'Manage custom quote requests, completed projects list, and configurations.'}
            </p>
          </div>
          <button onClick={handleLogout} className="btn" style={{ background: '#EF4444', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
            🚪 {isAr ? 'تسجيل الخروج' : 'Log Out'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, borderBottom: '1px solid var(--border)', paddingBottom: 1 }}>
          <button 
            onClick={() => setActiveTab('inquiries')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'inquiries' ? '2px solid var(--accent)' : '2px solid transparent',
              padding: '12px 20px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'inquiries' ? 'var(--accent-dark)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📥 {isAr ? 'طلبات التسعير المقلمة' : 'Client Inquiries'} ({inquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'projects' ? '2px solid var(--accent)' : '2px solid transparent',
              padding: '12px 20px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'projects' ? 'var(--accent-dark)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🛠️ {isAr ? 'إدارة الأعمال' : 'Portfolio (Works)'} ({projects.length})
          </button>
        </div>

        {/* Tab Content: Client Inquiries */}
        {activeTab === 'inquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {isAr ? 'سجلات طلبات العملاء' : 'Submitted Customer Sizing Inquiries'}
              </h2>
              {inquiries.length > 0 && (
                <button 
                  onClick={handleClearInquiries}
                  className="btn"
                  style={{ background: 'none', color: '#EF4444', border: '1px solid #EF4444', padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  🗑️ {isAr ? 'مسح السجلات بالكامل' : 'Clear All Inquiries'}
                </button>
              )}
            </div>

            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--surface-2)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📥</div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {isAr ? 'لا توجد سجلات طلبات حتى الآن. سيتم تسجيل طلبات العملاء المخصصة هنا تلقائياً.' : 'No customer inquiries logged yet. Submissions from Custom Sofa, Carpet, and Wallpaper creator forms will register here.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: 24,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ 
                          background: 'var(--accent-bg)', 
                          color: 'var(--accent-dark)', 
                          fontSize: '0.7rem', 
                          fontWeight: 700, 
                          padding: '3px 8px', 
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase'
                        }}>
                          {inq.type}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {inq.date}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>{inq.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        📞 <strong>Phone:</strong> {inq.phone}
                      </p>
                      
                      {/* Sizing specifics */}
                      {inq.dimensions && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--accent-dark)', marginTop: 8, fontWeight: 700 }}>
                          📏 <strong>Dimensions:</strong> {inq.dimensions}
                        </p>
                      )}

                      {inq.details && (
                        <div style={{ 
                          marginTop: 12, 
                          background: 'var(--surface)', 
                          padding: 12, 
                          borderRadius: 'var(--radius-sm)', 
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'pre-line'
                        }}>
                          {inq.details}
                        </div>
                      )}

                      {/* Reply & Delete actions */}
                      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                        <a
                          href={`https://wa.me/971542395964?text=${encodeURIComponent(`Hello, this is Two Line Furniture. We received your enquiry: "${inq.name}". How can we help you?`)}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '7px 14px', borderRadius: 'var(--radius-sm)',
                            background: '#25D366', color: '#fff',
                            fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none'
                          }}
                        >
                          💬 {isAr ? 'رد على واتساب' : 'Reply on WhatsApp'}
                        </a>
                        <button
                          onClick={() => {
                            const updated = inquiries.filter(i => i.id !== inq.id);
                            setInquiries(updated);
                            localStorage.setItem('twoline_inquiries', JSON.stringify(updated));
                          }}
                          style={{
                            padding: '7px 14px', borderRadius: 'var(--radius-sm)',
                            background: 'none', border: '1px solid #EF4444',
                            color: '#EF4444', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer'
                          }}
                        >
                          🗑️ {isAr ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Manage Completed Works */}
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'flex-start' }}>
            
            {/* Form to add completed work */}
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: 28,
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 20 }}>
                ➕ {isAr ? 'إضافة مشروع جديد يدوياً' : 'Add Completed Work'}
              </h2>

              <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Category Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Category</label>
                  <select 
                    value={projCategory} 
                    onChange={e => setProjCategory(e.target.value)}
                    style={{
                      padding: 10,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      color: 'var(--text)'
                    }}
                  >
                    <option value="curtains">Curtains (ستائر شيفون وستائر)</option>
                    <option value="blinds">Blinds (البلايند)</option>
                    <option value="sofa">Sofa & Seating (الكنب والجلوس)</option>
                    <option value="carpet">Carpets (السجاد والموكيت)</option>
                    <option value="wallpaper">Wallpaper (ورق الجدران)</option>
                  </select>
                </div>

                {/* Location (EN) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Location (English)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Al Bahia Villa, Abu Dhabi"
                    value={projLocEn} 
                    onChange={e => setProjLocEn(e.target.value)}
                    style={{
                      padding: 10,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      color: 'var(--text)'
                    }}
                  />
                </div>



                {/* Photo Upload Option */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {isAr ? 'تحميل صورة المشروع' : 'Upload Project Photo'}
                  </label>
                  <input 
                    type="file" 
                    id="project-image-file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      fontSize: '0.85rem'
                    }}
                  />
                  {uploadedImage && (
                    <div style={{ marginTop: 10 }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                        {isAr ? 'معاينة الصورة:' : 'Image Preview:'}
                      </p>
                      <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img src={uploadedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: 12 }}>
                  💾 {isAr ? 'حفظ المشروع ونشره' : 'Publish Completed Work'}
                </button>
              </form>
            </div>

            {/* List of manually added projects */}
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 20 }}>
                📋 {isAr ? 'المشاريع المنشورة حالياً' : 'Manually Published Works'} ({projects.length})
              </h2>

              {projects.length === 0 ? (
                <div style={{ padding: 40, border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  {isAr ? 'لم يتم نشر أي مشاريع بعد.' : 'No projects manually published yet.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {projects.map((p) => (
                    <div 
                      key={p.id}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img 
                          src={p.image} 
                          alt={p.titleEn}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            border: '1px solid var(--border)'
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                            {isAr ? p.titleAr : p.titleEn}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                            📍 {isAr ? p.locationAr : p.locationEn} | <span style={{ textTransform: 'uppercase' }}>{p.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteProject(p.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: 8,
                          fontSize: '0.9rem'
                        }}
                        title={isAr ? 'حذف' : 'Delete'}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
