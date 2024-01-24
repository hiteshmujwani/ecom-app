import bcrypt from 'bcryptjs'

export const hashPassword = async (password) =>{
    try {
        const hashed = await bcrypt.hash(password,10)
        console.log(hashed)
        return hashed
    } catch (error) {
        console.log(error)
    }
   
}


export const comparePassword = async (password,hashed) =>{
    return await  bcrypt.compare(password,hashed);
}