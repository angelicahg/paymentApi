var alumnos = []

for (let index = 0; index < 5 ; index++) {
  
    
    var nombre=prompt("nombre estudiante")
    var apellido=prompt("apellido estudiante")
    var codigo=prompt("codigo estudiante")

    var nota1=prompt("nota1") 
    var nota2=prompt("nota2")
    var nota3=prompt("nota3")


    alumnos.push({nombre,apellido,codigo,nota1,nota2,nota3})
    console.log(alumnos);
}

const getAlumnoporCodigo = (codigo) =>{
	let alumno = alumnos.filter(item => Number(item.codigo) === codigo);
	console.log(alumno);
	if (alumno.length > 0 ) {
		return alumno;
	}
	else {
		return "el usuario no existe en la base de datos"
	}
}

	const obtAlumnoporApellido = (tipo) =>{
		if (typeof tipo === "string") {
			
			let alumno = alumnos.filter(item => item.apellido == tipo);
			if (alumno.length === 1 ) {
				return alumno;
			}
			else if (alumno.length > 1 ){
			alert(alumno.map(item => `${item.nombre} ${item.apellido} ${item.codigo}` ));
			let elegirNuevoEtudiante = prompt("digite el codigo del estudiante a consultar")
			return getAlumnoporCodigo(elegirNuevoEtudiante );
			}
	
			else {
				return "el usuario no existe en la base de datos_"
			}
		}
		else if (typeof tipo === "number") {
			console.log("aqui estoy");
			return getAlumnoporCodigo(tipo)
			
		} 
	
}
let codigoEstudiante = prompt("ingrese apellido o codigo del estudiante a consultar")
	console.log("el estudiante a consultado es",obtAlumnoporApellido(codigoEstudiante));
