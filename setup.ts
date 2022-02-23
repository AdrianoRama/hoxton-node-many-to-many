import Database from 'better-sqlite3'

const db = new Database('./data.db', {
    verbose: console.log
})

// applicants
const applicants = [
    {
        name: 'Egon',
        email: "egon@gmail.com"
    },
    {
        name: 'Ilir',
        email: "ilir@gmail.com"
    },
    {
        name: 'Geri',
        email: "geri@gmail.com"
    },
    {
        name: 'Endi',
        email: "endi@gmail.com"
    }
]

// interviewers
const interviewers = [
    {
        name: 'Rinor',
        email: "rinor@gmail.com"
    },
    {
        name: 'Elidon',
        email: "elidon@gmail.com"
    },
    {
        name: 'Visard',
        email: "visard@gmail.com"
    },
    {
        name: 'Ed',
        email: "ed@gmail.com"
    }
]

// interviews
const interviews = [
    {
        applicantId: 1,
        interviewerId: 1,
        date: "22/02/2022",
        score: 10
    },
    {
        applicantId: 2,
        interviewerId: 1,
        date: "03/11/2021",
        score: 7
    },
    {
        applicantId: 2,
        interviewerId: 2,
        date: "07/07/2018",
        score: 4
    },
    {
        applicantId: 3,
        interviewerId: 4,
        date: "01/05/2021",
        score: 9
    },
    {
        applicantId: 1,
        interviewerId: 4,
        date: "13/01/2022",
        score: 9
    },
    {
        applicantId: 4,
        interviewerId: 2,
        date: "14/08/2021",
        score: 10
    }
]

db.exec(`
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS interviewers;

CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviewers (
  id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER,
  applicantId INTEGER NOT NULL,
  interviewerId INTEGER NOT NULL,
  date TEXT NOT NULL,
  score REAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (applicantId) REFERENCES applicants(id),
  FOREIGN KEY (interviewerId) REFERENCES interviewers(id)
);
`)

const createApplicant = db.prepare(`
INSERT INTO applicants (name, email) VALUES (?, ?);
`)

const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (?, ?);
`)

const createInterview = db.prepare(`
INSERT INTO interviews (applicantId, interviewerId, date, score)
VALUES (?, ? ,?, ?);
`)

for (const applicant of applicants) {
    createApplicant.run(applicant.name, applicant.email)
}

for (const interviewer of interviewers) {
    createInterviewer.run(interviewer.name, interviewer.email)
}

for (const interview of interviews) {
    createInterview.run(interview.applicantId, interview.interviewerId, interview.date, interview.score)
}
