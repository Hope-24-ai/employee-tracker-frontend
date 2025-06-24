import React from 'react';

function Navbar({ activeView, onSelectView }) {
  return (
    <nav className="navbar">
      <button
        className={activeView === 'profile' ? 'active' : ''}
        onClick={() => onSelectView('profile')}
      >
        My Profile
      </button>
      <button
        className={activeView === 'team' ? 'active' : ''}
        onClick={() => onSelectView('team')}
      >
        Team Roster
      </button>
      <button
        className={activeView === 'attendanceLeave' ? 'active' : ''}
        onClick={() => onSelectView('attendanceLeave')}
      >
        Attendance & Leave
      </button>
    </nav>
  );
}

export default Navbar;