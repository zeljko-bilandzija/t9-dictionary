const fs = require('fs');

// Class for T9 mechanism for predicting words
class T9 {
    constructor() {
        this.dictionary = '';
        this.dictionaryTree = {};
        this.words = this.initializeDictionary();
        this.keyMap = this.createKeyMap();
    }

    createKeyMap() {
        return {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'pqrs',
            8: 'tuv',
            9: 'wxyz'
        };
    }

    // Initializing dictionary. It is async method because we use fs for 
    // reading file and we need to wait until it reads file
    async initializeDictionary() {
        this.dictionary = await this.readDictionary();
        this.words = this.dictionary.split(/\s+/g);
        let tree = {};

        this.words.forEach(word => {
            const letters = word.split('');
            let leaf = tree;

            for (let i = 0; i < letters.length; i++) {
                const letter = letters[i].toLowerCase();
                const existing = leaf[letter];
                const last = i === letters.length - 1;

                // If child leaf doesn't exist, create it
                if (typeof(existing) === 'undefined') {
                    // If we're at the end of the word, mark with number, don't create a leaf
                    leaf = leaf[letter] = last ? 1 : {};
                } else if (typeof(existing) === 'number') { // If final leaf exists already
                    // Increment end mark number, to account for duplicates
                    if (last) {
                        leaf[letter]++;
                    } else { // Otherwise, if we need to continue, create leaf with $ marker
                        leaf = leaf[letter] = { $: existing };
                    }
                    // If we're at the end of the word and at a leaf object with an
                    // end $ marker, increment the marker to account for duplicates 
                } else if (typeof(existing) === 'object' && last) {
                    if (existing.hasOwnProperty('$')) {
                        leaf[letter].$++;
                    } else {
                        leaf[letter] = existing;
                        leaf[letter].$ = 1;

                    }
                    // Just keep going
                } else {
                    leaf = leaf[letter];
                }
            }
        });
        this.dictionaryTree = tree;
    }

    // Recursive method for finding words
    findWords(sequence, tree, exact, words, currentWord, depth) {
        const current = tree;
        sequence = sequence.toString();
        words = words || [];
        currentWord = currentWord || '';
        depth = depth || 0;

        for (let leaf in current) {
            let word = currentWord;
            const value = current[leaf];
            let key;

            // If the leaf key is $ handle things one level off since we
            // ignore $ marker when digging into the tree
            if (leaf === '$') {
                key = sequence.charAt(depth - 1);
                if (depth >= sequence.length) {
                    words.push(word);
                }
            } else {
                key = sequence.charAt(depth);
                word += leaf;
                if (depth >= (sequence.length - 1) && typeof(value) === 'number' && key && (this.keyMap[key].indexOf(leaf) > -1)) {
                    words.push(word);
                }
            }

            // If the leaf's value maps to our key or we're still tracing
            // the prefix to the end og the tree ('exact' is falsy), then
            // we must go deeper
            if ((key && this.keyMap.hasOwnProperty(key) && this.keyMap[key].indexOf(leaf) > -1) || (!key && !exact)) {
                this.findWords(sequence, value, exact, words, word, depth + 1);
            }
        }

        return words;
    }

    // Main method which predicts words
    predict(numericInput) {
        const input = new String(numericInput).replace('1', '').replace('0', '');
        const result = this.findWords(input, this.dictionaryTree, true);
        return result;
    }

    // Method for reading text dictionary
    // It is assumed that txt file is in server root folder. 
    // It can also be another way for supply dictonary (e.g through constructor with url, or many other ways)
    readDictionary() {
        return new Promise((resolve, reject) => {
            fs.readFile('./dictionary.txt', (err, data) => {
                if (err) {
                    resolve('');
                }
                resolve(data.toString());
            });
        });
    }
}

module.exports = T9;