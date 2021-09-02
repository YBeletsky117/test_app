



const getNameAndLast = (text: String): Array<string> => {
    let data = text.split(' ').filter((elem) => elem !== '').slice(0, 2)
    return data
}

export default getNameAndLast