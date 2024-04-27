const agregarEstudiante = async () => {
    try {
        const agregarRegistro = {
            text: "insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4)",
            values: ['Lita Torres', '13.456.432-7', 'Guitarra 5', 5]
        }

        const response = await pool.query(agregarRegistro);
        console.log(response);
    } catch (error) {
        console.log("No ha sido posible agregar al estudiante.", error)
    } finally {
        pool.end()
    }
};