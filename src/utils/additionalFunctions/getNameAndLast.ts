


/**
 * 
 * This function splits the string into an array
 * of individual words specified by the wordCount
 * parameter
 * 
 * @param text This is a text string that needs to be split
 * into two words into an array (only the first 
 * [wordCount] words)
 * 
 * @param wordCount The number of words to select
 * 
 * @returns 
 * 
 */
export function getNameAndLast (text: String, wordCount: number): Array<string> {
    return text.split(' ').filter((elem) => elem !== '').slice(0, wordCount)
}