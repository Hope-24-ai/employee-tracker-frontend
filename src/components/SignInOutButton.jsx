import React from 'react';

function SignInOutButton({ clockedIn, onClockIn, onClockOut }) {
  return (
    <div>
      {clockedIn ? (
        <button className="danger" onClick={onClockOut}>
          Clock Out
        </button>
      ) : (
        <button onClick={onClockIn}>
          Clock In
        </button>
      )}
    </div>
  );
}

export default SignInOutButton;