import React from 'react';

function SignInOutButton({ clockedIn, onClockIn, onClockOut }) {
  return (
    <div className="sign-in-out">
      {clockedIn ? (
        <button className="danger" onClick={onClockOut}>
          Clock Out
        </button>
      ) : (
        <button className="primary" onClick={onClockIn}>
          Clock In
        </button>
      )}
    </div>
  );
}

export default SignInOutButton;
