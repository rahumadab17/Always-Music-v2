const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "always_music",
    user: "postgres",
    password: "7804"
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);

const agregarEstudiante = async () => {

    const nombre = (argumentos[1]);
    const rut = (argumentos[2]);
    const curso = (argumentos[3]);
    const nivel = (argumentos[4]);

    if ( rut.includes(",")){
        console.log(`RUT incorrecto, intentalo con puntos (.) en vez de comas (,)`)
    } else {
        try {
            const agregarRegistro = {
                text: "insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;",
                values: [nombre, rut, curso, nivel],
                rowMode: "array",
            }
    
            const response = await pool.query(agregarRegistro);
            console.log(`Estudiante agregado con éxito`, response.rows);
        } catch (error) {
            const { code } = error;
            console.log(`No ha sido posible agregar al estudiante, error N°: ${code}`)
        } finally {
            pool.end()
        }
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
        const rut = (argumentos[1]);

        const mostrarPorRut = {
            text: "select * from estudiantes where rut = $1;",
            values: [rut],
            rowMode: "array",
        }

        const response = await pool.query(mostrarPorRut);
        console.log(`Registro por rut ${mostrarPorRut.values}`, response.rows);
    } catch (error) {
        const { code } = error;
        console.log(`No ha sido posible mostrar al estudiante, error N°: ${code}`)
    } finally {
        pool.end()
    }
};

const editarEstudiante = async () => {
    try {
        const nombre = (argumentos[1]);
        const rut = (argumentos[2]);
        const curso = (argumentos[3]);
        const nivel = (argumentos[4]);

        const editar = {
            text: "update estudiantes set nombre = $1, rut = $2, curso = $3, nivel = $4 where nombre = $1 or rut = $2 or curso = $3 or nivel = $4 RETURNING *;",
            values: [nombre, rut, curso, nivel],
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
        const rut = (argumentos[1]);
        
        const eliminar = {
            text: "delete from estudiantes where rut = $1;",
            values: [rut],
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

let argumentoFuncion = argumentos[0];

switch (argumentoFuncion) {
    case 'nuevo':
        agregarEstudiante();
        break;
    case 'consulta':
        mostrarEstudiantes();
        break;
    case 'mostrarPorRut':
        mostrarEstudiantePorRut();
        break;
    case 'editar':
        editarEstudiante();
        break;
    case 'eliminar':
        eliminarEstudiante();
        break;

    default:
        console.log("Por favor ingrese algún método a aplicar")
};