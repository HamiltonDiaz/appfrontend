import api from "../lib/axios";

export async function createUser(user) {
    console.log(user);

    // try {
    //     const { data } = await api.post('/nnn', user)
    // } catch (error) {

    // }

}


export async function loginUsuario(user) {
    // try {
    //     const { data } = await api.post('/nnn', user)
    // } catch (error) {

    // }
    // Simular la generación de un token falso
    const fakeToken = `faketoken-${Math.random().toString(36).substr(2, 9)}`;

    return {
        ...user,
        token: fakeToken
    }

}

export async function recuperacionUsuario(user) {
    console.log(user);
    // try {
    //     const { data } = await api.post('/nnn', user)
    // } catch (error) {

    // }

}