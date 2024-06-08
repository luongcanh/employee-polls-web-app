import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

describe('_saveQuestionAnswer', () => {
    // True is returned when correctly formatted data is passed to the function
    it('should save a question answer', async () => {
        const answerData = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionOne',
        };

        const result = await _saveQuestionAnswer(answerData);
        expect(result).toBe(true);
    });

    // An error is returned if incorrect data is passed to the function
    it('should return an error when required fields are missing', async () => {
        const answerData = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
        };

        await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
            'Please provide authedUser, qid, and answer',
        );
    });
});

describe('_saveQuestion', () => {
    // The saved question is returned and all expected fields are populated when correctly formatted data is passed to the function
    it('should save a question', async () => {
        const question = {
            optionOneText: 'Option One',
            optionTwoText: 'Option Two',
            author: 'sarahedo',
        };

        const savedQuestion = await _saveQuestion(question);
        const expected = {
            id: expect.any(String),
            author: 'sarahedo',
            timestamp: expect.any(Number),
            optionOne: {
                votes: [],
                text: 'Option One',
            },
            optionTwo: {
                votes: [],
                text: 'Option Two',
            },
        };
        expect(savedQuestion).toBeDefined();
        expect(savedQuestion).toEqual(expected);
    });

    // An error is returned if incorrect data is passed to the function
    it('should return an error when required fields are missing', async () => {
        const question = {
            id: 'def456',
            optionOneText: 'Option One',
            author: 'sarahedo',
        };

        await expect(_saveQuestion(question)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author',
        );
    });
});
