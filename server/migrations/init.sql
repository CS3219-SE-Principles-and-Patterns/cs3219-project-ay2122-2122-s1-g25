DROP TABLE IF EXISTS Users, InterviewSessions, Questions, Rotations, Feedback, UserMatching cascade;

CREATE TABLE IF NOT EXISTS Users (
   	userId TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    interviewerId TEXT,
    intervieweeId TEXT,
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
    giverId TEXT, 
    receiverId TEXT, 
    iSessionId INTEGER,
    rating SMALLINT NOT NULL,
    comment TEXT,
    FOREIGN KEY(giverId) REFERENCES Users,
    FOREIGN KEY(receiverId) REFERENCES Users,
    FOREIGN KEY(iSessionId) REFERENCES InterviewSessions
);

CREATE TABLE IF NOT EXISTS UserMatching (
  	userId TEXT PRIMARY KEY,
    startedMatchingAt TIMESTAMP, 
    difficulty SMALLINT, 
    matchId TEXT UNIQUE
);
