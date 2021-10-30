const { UserMatching } = require("../../models/userMatching");
const assert = require('assert');
const chai = require('chai');
const userMatching = new UserMatching();

describe('Test UserMatching functions', () => {
    describe('Insert one UserMatching to the table', () => {
        it('should have the inserted UserMatching object as the output', () => {
            const matchTime = new Date();
            return userMatching.createUserMatching(6, matchTime, 1, null).then(res => {
                assert.equal(res.rows.length, 1)
                assert.equal(res.rows[0].userid, 6)
                assert.equal(res.rows[0].difficulty, 1)
                assert.equal(res.rows[0].interviewsessionid, null)
            })
        })
    })

    describe('Get specified UserMatching', () => {
        it('should have the specified UserMatching object as the output', () => {
            return userMatching.getUserMatching(6).then(res => {
                assert.equal(res.rows.length, 1)
                assert.equal(res.rows[0].userid, 6)
                assert.equal(res.rows[0].difficulty, 1)
                assert.equal(res.rows[0].interviewsessionid, null)
            })
        })
    })

    describe('Update specified UserMatching', () => {
        it('should have the updated UserMatching object as the output', () => {
            userMatching.updateUserMatching(6, 42)
            return userMatching.getUserMatching(6).then(res => {
                assert.equal(res.rows.length, 1)
                assert.equal(res.rows[0].userid, 6)
                assert.equal(res.rows[0].difficulty, 1)
                assert.equal(res.rows[0].interviewsessionid, 42)
            })
        })
    })

    describe('Get all available UserMatching', () => {
        it('should have all the UserMatching object with the specified difficulty', () => {
            return userMatching.getAllAvailableUserMatching(6, 1).then(res => {
                assert.equal(res.rows.length, 0)
            })
        })
    })

    describe('Delete one UserMatching from the table', () => {
        it('should have the deleted UserMatching object as the output', () => {
            return userMatching.deleteUserMatching(6).then(res => {
                assert.equal(res.rows.length, 1)
                assert.equal(res.rows[0].userid, 6)
                assert.equal(res.rows[0].difficulty, 1)
                assert.equal(res.rows[0].interviewsessionid, 42)
            })
        })
    })
})