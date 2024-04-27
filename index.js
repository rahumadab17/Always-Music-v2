const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "always_music",
    user: "postgres",
    password: "7804"
};

const argumentos = process.argv.slice(2);

const pool = new Pool(config);

//CONSULTAS CON JSON

const agregarEstudiante = async () => {
    try {
        const agregarRegistro = {
            text: "insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;",
            values: ['Constanza Guevara', '13.456.432-7', 'Chelo 5', 3],
            rowMode: "array"
        }

        const response = await pool.query(agregarRegistro);
        console.log(`Estudiante agregado con éxito`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible agregar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantes = async () => {
    try {
        const mostrar = {
            text: "select * from estudiantes;",
            rowMode: "array"
        }

        const response = await pool.query(mostrar);
        console.log("Registro actual", response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible mostrar a los estudiantes, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantePorRut = async () => {
    try {
        const mostrarPorRut = {
            text: "select * from estudiantes where rut = $1;",
            value: ['13.456.432-7'],
            rowMode: "array",
        }

        const response = await pool.query(mostrarPorRut);
        console.log(`Registro por rut ${mostrarPorRut.value}`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible mostrar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const editarEstudiante = async () => {
    try {
        const editar = {
            text: "update estudiantes set nombre = $1, rut = $2, curso = $3, nivel = $4 where nombre = $1 or rut = $2 or curso = $3 or nivel = $4 RETURNING *;",
            values: ['Constanza Guevara', '13.456.432-7', 'Piano 3', 3]
        }
    
        const response = await pool.query(editar);
        console.log(`Estudiante editado con éxito`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible editar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const eliminarEstudiante = async () => {
    try {
        const eliminar = {
            text: "delete from estudiantes where rut = $1;",
            values: ['13.456.432-7']
        }
    
        const response = await pool.query(eliminar);
        console.log(`Registro de estudiante con rut ${eliminar.values} eliminado`);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible eliminar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

//Consultas con texto parametrizado

const agregarEstudianteText = async () => {
    try {
        const action = "insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;";
        const values = ['Constanza Guevara', '13.456.432-7', 'Chelo 5', 3]
    
        const response = await pool.query(action, values);
        console.log(`Estudiante agregado con éxito`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible agregar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantesText = async () => {
    try {
        const action = "select * from estudiantes;";

        const response = await pool.query(action);
        console.log("Registro actual", response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible mostrar a los estudiantes, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantePorRutText = async () => {
    try {
        const action = "select * from estudiantes where rut = $1;";
        const value = ['13.456.432-7'];

        const response = await pool.query(action, value);
        console.log(response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible mostrar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const editarEstudianteText = async () => {
    try {
        const action = "update estudiantes set nombre = $1, rut = $2, curso = $3, nivel = $4 where nombre = $1 or rut = $2 or curso = $3 or nivel = $4 RETURNING *;";
        const values = ['Constanza Guevara', '13.456.432-7', 'Piano 3', 3];
    
        const response = await pool.query(action, values);
        console.log(`Estudiante editado con éxito`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible editar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const eliminarEstudianteText = async () => {
    try {
        const action = "delete from estudiantes where rut = $1 RETURNING *;";
        const values = ['13.456.432-7'];
    
        const response = await pool.query(action, values);
        console.log(`Registro de estudiante con rut ${values} eliminado`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible eliminar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

let argumentoFuncion = argumentos[0];

switch (argumentoFuncion) {
    case 'nuevoJSON':
        agregarEstudiante();
        break;
    case 'consultaJSON':
        mostrarEstudiantes();
        break;
    case 'mostrarPorRutJSON':
        mostrarEstudiantePorRut();
        break;
    case 'editarJSON':
        editarEstudiante();
        break;
    case 'eliminarJSON':
        eliminarEstudiante();
        break;
    case 'nuevoText':
        agregarEstudianteText();
        break;
    case 'consultaText':
        mostrarEstudiantesText();
        break;
    case 'mostrarPorRutText':
        mostrarEstudiantePorRutText();
        break;
    case 'editarText':
        editarEstudianteText();
        break;
    case 'eliminarText':
        eliminarEstudianteText();
        break;

    default:
        console.log("Por favor ingrese algún método a aplicar")
};