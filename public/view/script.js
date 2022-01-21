// @ts-check

/** @template T @typedef { import('../../assets/js/request').DataType<T> } DataType */
import { Request } from "../../assets/js/request";

/**
 * @typedef {object} Computer Composición del computador
 * @property {string | number} gce_id Idetificación única del computador
 * @property {string} gce_nombre_equipo Nombre del equipo
 * @property {string} gce_board Tipo de placa base
 * @property {string} gce_case Modelo de la torre
 * @property {string} gce_procesador Marca del procesador
 * @property {string} gce_grafica Marca de la trajeta gráfica
 * @property {string} gce_ram Tamaño total de ram
 * @property {string} gce_disco_duro Modelo del disco duro
 * @property {string} gce_teclado Tipo de teclado
 * @property {string} gce_mouse Tipo de mouse
 * @property {string} gce_pantalla Tamaño total de la pantalla
 * @property {string | number} gce_estado Estado del registro
 */

/** Clase que representa al componente view */
class View {

  /** @type {(keyof Computer)[]} Listado de campos de la tabla de computadores */
  static columnList = [
    'gce_nombre_equipo',
    'gce_board',
    'gce_case',
    'gce_procesador',
    'gce_grafica',
    'gce_ram',
    'gce_disco_duro',
    'gce_teclado',
    'gce_mouse',
    'gce_pantalla',
    'gce_estado',
    'gce_id'
  ]

  constructor() { }

  /** Obtiene el listado de computadores y los actualiza en la tabla */
  static getComputers = () => Request.get('Caracteristicas', 'getAll');

  /**
   * Actualiza el listado de computadores en la tabla
   * @param {Computer[]} data 
   */
  static setComputerList(data) {
    /** @type {HTMLElement} Referencia del cuerpo de la tabla */
    const tbody = document.querySelector('#list-table tbody');
    tbody.innerHTML = ''; // Limpia la tabla

    data.forEach(item => { // Ingresa los registros en la tabla
      let row = '<tr>'; // Crea la fila

      this.columnList.forEach(columnName => {
        let column = '<td>'; // Crea la columna
        switch (columnName) { // Añade el texto a la columna
          case 'gce_id': /** No añade la propiedad Id */ break;
          case 'gce_estado': column += (+item[columnName] === 1 ? 'Activo' : 'Inactivo'); break;
          default: column += item[columnName]; break;
        }
        column += '</td>';
        row += column; // Añade la columna a la fila
      });

      row += '</tr>';
      tbody.innerHTML += row; // Añade la fila a la tabla
    });
  }

  /** 
   * Registra un computador en la base de datos 
   * @param {Partial<Record<keyof Computer, string>>} parameters Valores de inserción
   */
  static registerComputer = (parameters) => Request.post('Caracteristicas', 'addOne', parameters);

}

// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {

  View.getComputers() // Actualiza la tabla de computadores
    .then(/** @param {DataType<Computer[]>} response */(response) => {
      console.log(87, response, response.data);
      View.setComputerList(response.data);
    }).catch(error => console.log('Ha ocurrido un error', error));

  /** @type {HTMLFormElement} Referencia del formulario de registro */
  const registerForm = document.querySelector('#register-form');

  /** Evento de guardar */
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Cancela la redirección HTML

    /** @type {Partial<Record<keyof Computer, string>>} */
    const parameters = {};

    View.columnList.forEach(columnName => {
      if (columnName !== 'gce_id') {
        /** @type {HTMLInputElement | HTMLSelectElement} */
        const input = registerForm.querySelector(`[name="${columnName}"]`);
        parameters[columnName] = input?.value;
      }
    });

    View.registerComputer(parameters) // Registra el computador
      .then(/** @param {DataType<Computer[]>} response */(response) => {
        console.log(111, response, response.data);
      }).catch(error => console.log('Ha ocurrido un error', error));
  });

});
