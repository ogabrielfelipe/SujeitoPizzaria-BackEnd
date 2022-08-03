import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

//Criptografia de senha
//Biblioteca: bcryptjs   @types/bcryptjs -D


interface UserRequest{
    name: String;
    email: String;
    password: String;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //Verificar se enviou um email
        if(!email){
            throw new Error("Email incorrect")
        }
        //Verificar se o email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        
        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }