CREATE TABLE IF NOT EXISTS Users (
   	userId TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    createdAt TIMESTAMP,
    username TEXT UNIQUE NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS InterviewSessions (
    iSessionId INTEGER PRIMARY KEY,
    timeslot TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Questions (
    questionId SERIAL PRIMARY KEY,
    category TEXT,
    difficulty SMALLINT, --1 being easy, 3 being hard
    description TEXT NOT NULL,
    input TEXT[] NOT NULL,
    output TEXT[] NOT NULL,
    suggestedAnswer TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Rotations (
    interviewerId INTEGER,
    intervieweeId INTEGER,
    questionId INTEGER,
    iSessionId INTEGER,
    attempt TEXT,
    PRIMARY KEY (interviewerId, intervieweeId, iSessionId),
    FOREIGN KEY(interviewerId) REFERENCES Users,
    FOREIGN KEY(intervieweeId) REFERENCES Users,
    FOREIGN KEY(questionId) REFERENCES Questions,
    FOREIGN KEY(iSessionId) REFERENCES InterviewSessions
);

CREATE TABLE IF NOT EXISTS Feedback (
  	feedbackId SERIAL PRIMARY KEY,
    giverId INTEGER, 
    receiverId INTEGER, 
    iSessionId INTEGER,
    rating SMALLINT NOT NULL,
    comment TEXT,
    FOREIGN KEY(user_one) REFERENCES Users,
    FOREIGN KEY(user_two) REFERENCES Users,
    FOREIGN KEY(interview_session_id) REFERENCES InterviewSessions
);

CREATE TABLE IF NOT EXISTS UserMatching (
  	userId TEXT PRIMARY KEY,
    startedMatchingAt TIMESTAMP, 
    difficulty SMALLINT, 
    matchId TEXT UNIQUE,
    isSearch BOOLEAN NOT NULL DEFAULT 1,
);
