require("colors");
const inquirer = require("inquirer");


let alumnos = []
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¡Bienvenido!¿Que quiere Hacer?",
    choices: [
      {
        value: "1",
        name: "1.Ver estudiantes"
      },
      {
        value: "2",
        name: "2.Registro de un nuevo estudiante"
      },
      {
        value: "3",
        name: "3.Consultar estudiante"
      },
      {
        value: "4",
        name: "Salir"
      },
    ]
  }
];
const consultMenu = [
  {
    type: "list",
    name: "opcion",
    message: "¡Bienvenido!¿Que quiere Hacer?",
    choices: [
      {
        value: "1",
        name: "1.Editar estudiante"
      },
      {
        value: "2",
        name: "2.Eliminar estudiante"
      },
      {
        value: "3",
        name: "3.Regresar"
      },
    ]
  }
];

const inquirerMenu = async (menu) => {
  console.log("==================".blue);
  console.log("=======Menú=======".green);
  console.log("==================\n".blue);

  const { opcion } = await inquirer.prompt(menu);
  return opcion;
}
const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: "Presione Enter para continuar"
    }
  ]
  await inquirer.prompt(question);
  console.clear();
}
const leerInput = async (message, type) => {
  const nuevosDtos = [
    {
      type,
      name: "datosAlumnos",
      message,
      validate(value) {
        if (value.length === 0) {
          return "ingrese un valor"
        }
        return true;
      }
    }
  ];
  const { datosAlumnos } = await inquirer.prompt(nuevosDtos)
  return datosAlumnos;
}
const valueAlumn = async (message, type) => {
  const nuevosDtos = [
    {
      type,
      name: "datosAlumnos",
      message,
      validate(value) {
        if (alumnos.some(data => data.code === value)) {
          return "El codigo ya esta registrado,intente nuevamente"
        }
        if (value.length === 0) {
          return "ingrese un valor"
        }
        return true;
      }
    }
  ];
  const { datosAlumnos } = await inquirer.prompt(nuevosDtos)
  return datosAlumnos;
}
function seeAlumn(alumnos) {
  if (alumnos.length === 0) {
    console.log("No se encuentran estudiantes inscritos")
  }
  else {
    console.log(alumnos)
  }
}
//Agregar estudiantes
async function newAlumn() {
  let newAlumn = {};
  newAlumn.code= await valueAlumn("codigo", "input");
  newAlumn.nombre = await leerInput("Nombre");
  newAlumn.apellido = await leerInput("Apellido", "string");
  newAlumn.examen = parseFloat(await leerInput("Nota examen", "number"));
  newAlumn.taller = parseFloat(await leerInput("Nota taller", "number"));
  newAlumn.quiz = parseFloat(await leerInput("Nota quiz", "number"));
  newAlumn.notaFinal = newAlumn.examen * 0.5 + newAlumn.taller * 0.3 + newAlumn.quiz * 0.2;
  alumnos.push(newAlumn);
  console.table(newAlumn);
  console.log("El estudiante quedo agregado");
}
//editar alumnos 
async function editAlumn(alumno) {
  
  alumno.code = alumno.code;
  alumno.nombre = await leerInput("Nombre", "input");
  alumno.apellido = await leerInput("Apellido", "input");
  alumno.taller = parseFloat(await leerInput("Nota taller", "input"));
  alumno.quiz = parseFloat(await leerInput("Nota quiz", "input"));
  alumno.notaFinal = alumno.examen * 0.5 + alumno.taller * 0.3 + alumno.quiz * 0.2;
  let newAlumns =[];
  alumnos.map(a =>{
    a.code === alumno.code ? newAlumns.push(alumno): newAlumns.push(a)
   })
  alumnos = newAlumns;
  // alumnos.push(editAlumn);
  // console.table(editAlumn);
  console.log("Estudiante editado");
}
//Eliminar Alumno 
function deleteAlumn(consulta) {
  alumnos = alumnos.filter(data => (data.code === consulta) ? false : true);
  console.log("el estudiante fue eliminado")
}

// 

//menu 
async function main() {
  let opt = "";
  do {
    opt = await inquirerMenu(preguntas);
    console.log(opt);
    switch (opt) {
      case "1":
        seeAlumn(alumnos);
        break;
      case "2":
        await newAlumn();
        break;
      case "3":
        let nuevo = await leerInput("Ingresar el codigo o apellido del estudiante")
        let obtAlumno = alumnos.filter(data => (data.apellido === nuevo || data.code === nuevo));
        if (obtAlumno.length === 0) {
          console.log("No hay concidencia con los datos registrados")
          break;
        }else {
          console.table(obtAlumno);
        }
        let index = "";
        let obtIndex = await leerInput("Ingrese numero del estudiante", "input");
        let selectAlumn = obtAlumno[obtIndex];
        console.table(selectAlumn);
        
          index = await inquirerMenu(consultMenu);
          switch (index) {
            case "1":
              await editAlumn(selectAlumn);
              break;
            case "2":
              deleteAlumn(selectAlumn.code);
              break;
            case "3":
              console.log("Volver al menú");
              break;
          }
          await pause()
        break;
      case "4":
        console.log("Hasta luego");
    }await pause();
  } while (opt !== "4");
}

main();
