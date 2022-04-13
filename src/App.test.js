import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe('Starwars SW.API application', () => {
  beforeAll(() => jest.spyOn(window, "fetch"));


  // Empezamos con un test en el que colocamos el nombre de Luke manualmente
  // it('Should show a list of characters including Luke Skywalker', () => {
  //   render(<App />);
  //   expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  // })

  // Segundo, comprobamos copiando los datos de la API en un fichero JSON en local

  // it('Should show a list of characters from JSON FILE', () => {
  //   render(<App />);
  //   for (let character of data.results) {
  //     expect(screen.getByText(character.name)).toBeInTheDocument();
  //   }
  // })

  // Una vez funcionan los dos anteriores ya podemos mockear la llamada a la API
  it('Should show a list of characters from the API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    })

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/');
    for (let character of data.results) {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    }

  })

  it('Should show an error when there is a network error', async () => {
    window.fetch.mockRejectedValueOnce(new Error("Network error"));
    render(<App />);
    expect(await screen.findByText("Network error")).toBeInTheDocument()
  })
})