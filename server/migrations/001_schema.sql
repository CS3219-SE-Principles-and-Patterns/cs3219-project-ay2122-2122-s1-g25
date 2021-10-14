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
    rotationNum SMALLINT NOT NULL, -- 0 and 1. During rot 0, user0 is interviewee and user1 is interviewer.
    complete BOOLEAN NOT NULL,
    difficulty SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS Questions (
    questionId SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category TEXT NOT NULL,
    difficulty SMALLINT NOT NULL, -- 0 = easy, 1 = moderate, 2 = hard
    description TEXT NOT NULL,
    input TEXT[] NOT NULL,
    output TEXT[] NOT NULL,
    suggestedAnswer TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Rotations (
    iSessionId INTEGER NOT NULL REFERENCES InterviewSessions,
    rotationNum SMALLINT NOT NULL,
    questionId INTEGER NOT NULL REFERENCES Questions,
    attempt TEXT NOT NULL DEFAULT '',
    PRIMARY KEY(iSessionId, rotationNum)
);

CREATE TABLE IF NOT EXISTS Feedbacks (
  	feedbackId SERIAL PRIMARY KEY,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    giverId TEXT NOT NULL REFERENCES Users, 
    receiverId TEXT NOT NULL REFERENCES Users, 
    iSessionId INTEGER NOT NULL REFERENCES InterviewSessions,
    rating SMALLINT NOT NULL,
    comment TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS UserMatching (
  	userId TEXT PRIMARY KEY,
    startedMatchingAt TIMESTAMP, 
    difficulty SMALLINT, 
    matchId TEXT UNIQUE
);
