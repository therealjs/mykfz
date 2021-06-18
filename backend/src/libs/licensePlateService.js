'use strict';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const digits = '0123456789'.split('');

module.exports = class LicensePlateService {
    constructor() {}

    static generatePlates(areaCode) {
        let result = [];
        for (let i = 0; i < letters.length; i++) {
            const firstLetter = letters[i];
            for (let j = 0; j < letters.length; j++) {
                const secondLetter = letters[j];
                const letterCombination = `${firstLetter}${secondLetter}`;
                for (let number = 1; number <= 2; number++) {
                    const plate = {
                        areaCode: areaCode,
                        letters: letterCombination,
                        digits: number
                    };
                    result.push(plate);
                }
            }
        }
        return result;
    }

    static generatePlatesMatchingPattern(
        areaCode,
        letterPattern,
        digitPattern
    ) {
        let result = [];
        letterPattern = letterPattern.split('');
        const firstLetterOptions =
            letterPattern[0] === '?' ? letters : [letterPattern[0]];

        let secondLetterOptions = [];
        const hasSecondLetter = letterPattern.length === 2;
        if (hasSecondLetter) {
            // there is a second letter
            secondLetterOptions =
                letterPattern[1] === '?' ? letters : [letterPattern[1]];
        }

        for (const firstLetterOption of firstLetterOptions) {
            if (hasSecondLetter) {
                // loop through secondLetterOptions
                for (const secondLetterOption of secondLetterOptions) {
                    const letterCombination = `${firstLetterOption}${secondLetterOption}`;
                    for (const num of this.matchingNumbers(digitPattern)) {
                        const plate = {
                            areaCode: areaCode,
                            letters: letterCombination,
                            digits: num
                        };
                        result.push(plate);
                    }
                }
            } else {
                for (const num of this.matchingNumbers(digitPattern)) {
                    const plate = {
                        areaCode: areaCode,
                        letters: firstLetterOption,
                        digits: num
                    };
                    result.push(plate);
                }
            }
        }

        return result;
    }

    static matchingNumbers(digitPattern) {
        let res = [];
        for (let num = 1; num <= 9999; num++) {
            if (this.numberMatchesPattern(num, digitPattern)) {
                res.push(num);
            }
        }
        return res;
    }

    static numberMatchesPattern(number, digitPattern) {
        const numberPositions = number.toString().split('');
        const patternPositions = digitPattern.split('');

        if (numberPositions.length != patternPositions.length) {
            return false;
        }

        for (let i = 0; i < numberPositions.length; i++) {
            const numPos = numberPositions[i];
            const patternPos = patternPositions[i];

            if (patternPos != '?' && numPos != patternPos) {
                return false;
            }
        }

        return true;
    }
};
