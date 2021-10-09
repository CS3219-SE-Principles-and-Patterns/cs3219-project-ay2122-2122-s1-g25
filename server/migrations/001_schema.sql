SET TIMEZONE = 'Asia/Singapore';

DROP TABLE IF EXISTS Users, InterviewSessions, Questions, Rotations, Feedbacks, UserMatching;

CREATE TABLE IF NOT EXISTS Users (
   	userId TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS InterviewSessions (
    iSessionId SERIAL PRIMARY KEY,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user0 TEXT NOT NULL REFERENCES Users,
    user1 TEXT NOT NULL REFERENCES Users,
    rotation SMALLINT NOT NULL,
    complete BOOLEAN NOT NULL,
    difficulty SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS Questions (
    questionId SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    difficulty SMALLINT NOT NULL, --1 being easy, 3 being hard
    description TEXT NOT NULL,
    input TEXT[] NOT NULL,
    output TEXT[] NOT NULL,
    suggestedAnswer TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Rotations (
    iSessionId INTEGER NOT NULL REFERENCES InterviewSessions,
    rotation SMALLINT NOT NULL,
    questionId INTEGER NOT NULL REFERENCES Questions,
    attempt TEXT NOT NULL DEFAULT '',
    PRIMARY KEY(iSessionId, rotation)
);

CREATE TABLE IF NOT EXISTS Feedbacks (
  	feedbackId SERIAL PRIMARY KEY,
    giverId TEXT NOT NULL REFERENCES Users, 
    receiverId TEXT NOT NULL REFERENCES Users, 
    iSessionId INTEGER NOT NULL REFERENCES InterviewSessions,
    rating SMALLINT NOT NULL,
    comment TEXT NOT NULL DEFAULT '',
);

CREATE TABLE IF NOT EXISTS UserMatching (
  	userId TEXT PRIMARY KEY,
    startedMatchingAt TIMESTAMP, 
    difficulty SMALLINT, 
    matchId TEXT UNIQUE
);
