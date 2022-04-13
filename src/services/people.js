export async function getPeople(page) {
    try {

        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw error;

    }
}

export async function getCharacter(idChar = 1) {
    try {

        const response = await fetch(`https://swapi.dev/api/people/${idChar}`);
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw error;

    }
}

export async function searchCharacters(nombre) {
    try {

        const response = await fetch(`https://swapi.dev/api/people/?search=${nombre}`);
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw error;

    }
}
class NetworkError extends Error {
    constructor() {
        super("Network error")
    }
}