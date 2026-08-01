import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Edit3, Plus, Video, FileText, CheckCircle2, Save } from 'lucide-react';

export default function CourseManager() {
  const { courses, setCourses } = useApp();
  const [courseState, setCourseState] = useState(courses);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCourses(courseState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>QUẢN LÝ KHOÁ HỌC & BÀI GIẢNG</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chỉnh sửa thông tin khoá học Zoom và lộ trình bài giảng cho học viên</p>
        </div>

        {savedSuccess && (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Đã lưu thông tin khoá học!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* GENERAL COURSE INFO */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-primary)', marginBottom: '20px' }}>THÔNG TIN CHUNG KHOÁ HỌC</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Tên Khoá Học (Hiển thị trên Landing Page)</label>
              <input 
                type="text" 
                className="form-input" 
                value={courseState.title}
                onChange={e => setCourseState({ ...courseState, title: e.target.value })}
              />
            </div>

            <div className="grid-2">
              <div>
                <label className="form-label">Giảng Viên Chịu Trách Nhiệm</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={courseState.instructor}
                  onChange={e => setCourseState({ ...courseState, instructor: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Lịch Học Qua Zoom</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={courseState.schedule}
                  onChange={e => setCourseState({ ...courseState, schedule: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Mô Tả Kinh Nghiệm Giảng Viên (Instructor Bio)</label>
              <textarea 
                className="form-input"
                rows="3"
                value={courseState.instructorBio}
                onChange={e => setCourseState({ ...courseState, instructorBio: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>

        {/* MODULES EDIT */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-primary)', marginBottom: '20px' }}>NỘI DUNG NĂM BUỔI HỌC (SYLLABUS)</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {courseState.modules.map((mod, idx) => (
              <div key={mod.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', padding: '18px', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '8px' }}>BUỔI 0{mod.id}</div>
                
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ marginBottom: '10px' }}
                  value={mod.title}
                  onChange={e => {
                    const newModules = [...courseState.modules];
                    newModules[idx].title = e.target.value;
                    setCourseState({ ...courseState, modules: newModules });
                  }}
                />

                <textarea 
                  className="form-input"
                  rows="2"
                  value={mod.description}
                  onChange={e => {
                    const newModules = [...courseState.modules];
                    newModules[idx].description = e.target.value;
                    setCourseState({ ...courseState, modules: newModules });
                  }}
                ></textarea>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-gold" style={{ padding: '14px 32px' }}>
            <Save size={18} /> Lưu Thay Đổi Khoá Học
          </button>
        </div>

      </form>
    </div>
  );
}
