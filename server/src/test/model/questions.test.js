
const { Questions } = require("../../models/questions");
const assert = require('assert');
require('chai');
const question = new Questions();

describe('Test Questions functions', () => {
    describe('Get random 2 questions from questions table', () => {
        it('should have a size 2 for the output', () => {
            return question.getRandTwoQuestions(1).then(res => {
                assert.equal(res.rows.length, 2)
            })
        })
    })

    describe('Insert one question to the questions table', () => {
        it('should have a size 1 for the output, which is the inserted question', () => {
            const dummyQuestion = {
                title: 'Test',
                category: 'Test',
                difficulty: 2,
                description: 'Description',
                input: '{"input1", "input2"}',
                output: '{"output1", "output2"}',
                suggestedAnswer: 'Suggested Answer'
            }
            return question.createQuestion(dummyQuestion).then(res => {
                assert.equal(res.rows.length, 1)
                assert.equal(res.rows[0].title, 'Test')
                assert.equal(res.rows[0].category, 'Test')
                assert.equal(res.rows[0].difficulty, 2)
                assert.equal(res.rows[0].description, 'Description')
                assert.equal(res.rows[0].input.length, 2)
                assert.equal(res.rows[0].output.length, 2)
                assert.equal(res.rows[0].suggestedanswer, 'Suggested Answer')
            })
        })
    })

    describe('Delete one question from the questions table', () => {
        it('should have a size 1 for the output, which is the deleted question', () => {
            return question.deleteQuestion(11).then(res => {
                assert.equal(res.rows.length, 1)
            })
        })
    })
})

