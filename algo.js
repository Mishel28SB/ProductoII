let canvas = 
    document.getElementById("canvas");
var anchura = canvas.width;
var altura = canvas.height;
var cd = canvas.getContext("2d");

ExhibirCuadricula(20, 20, 1);

document.getElementById("btnCalcular").addEventListener("click", calcular);
var arrxy= new Array(2);
function calcular(){
    //Valores de la ecuación 1
	var a = document.getElementById("txta").value;
	var b = document.getElementById("txtb").value;
	var c = document.getElementById("txtc").value;
    //Valores de la ecuación 2
	var d = document.getElementById("txtd").value;
	var e = document.getElementById("txte").value;
	var f = document.getElementById("txtf").value;
    //Valores de X
	var x1 = document.getElementById("txtX1").value;
	var x2 = document.getElementById("txtX2").value;
	var x3 = document.getElementById("txtX3").value;
	var x4 = document.getElementById("txtX4").value;
    //Arrglo 1
	var arr1 = new Array(2);
    //Arreglo 2
	var arr2 = new Array(2);
	CalcularExtremos(a,b,c,x1,x2,arr1);
	CalcularExtremos(d,e,f,x3,x4,arr2);
    DibujarPunto(a,b,c,x1,x2,arr1);
    DibujarPuntos(d,e,f,x3,x4,arr2);
    s2e1(a,b,c,d,e,f,arrxy);
    DibujarCruce(arrxy);
    //Impresión de resultados desde el index
    document.getElementById("ecuacionUno").innerHTML = "Ecuación Uno: "+ a+"x + "+b+"y = "+c;
    document.getElementById("ecuacionDos").innerHTML = "Ecuación Dos: "+d+"x + "+e+"y = "+f;
    document.getElementById("resulX").innerHTML = "X: "+ arrxy[0];
    document.getElementById("resulY").innerHTML = "Y: "+ arrxy[1];
	}

function CalcularExtremos(a, b, c, x1, x2, arr1){
	arr1[0] = (c-a*x1)/b;
	arr1[1] = (c-a*x2)/b; 
}

function ExhibirCuadricula(xnumpix_um, ynumpix_um, ancholinea){
	cd.beginPath();
	cd.strokeStyle = "#00FFFF";
	cd.lineWidth = ancholinea;
	for(i=0; i<anchura; i++){
		cd.moveTo(0,0+i*xnumpix_um);
		cd.lineTo(anchura, 0+i*xnumpix_um);
	}
	for(i=0; i<altura; i++){
		cd.moveTo(0+i*ynumpix_um,0);
		cd.lineTo(0+i*ynumpix_um,altura);
	}
	cd.stroke();

    cd.beginPath();
    cd.strokeStyle="#000000";
    cd.moveTo(canvas.width/2,0);
    cd.lineTo(canvas.width/2,canvas.height);
    cd.stroke();

    cd.beginPath();
    for(i=0; i<altura; i++){
		cd.moveTo(0+i*ynumpix_um,altura/2);
		cd.lineTo(0+i*ynumpix_um,altura/2-5);
	}
    cd.stroke();
    

    cd.beginPath();
    cd.moveTo(0,canvas.height/2);
    cd.lineTo(canvas.width,canvas.height/2);
    cd.stroke();

    cd.beginPath();
    for(i=0; i<anchura; i++){
		cd.moveTo(anchura/2,0+i*xnumpix_um);
		cd.lineTo(anchura/2+5, 0+i*xnumpix_um);
	}
    cd.stroke();

    cd.font = "20px serif";
    cd.strokeStyle = "#000000"; 
    cd.strokeText("0", anchura/2-5, altura/2+5);

    cd.font = "10px serif";
    for(i=anchura/xnumpix_um/2+1; i<anchura; i++){
		cd.strokeText("-"+(i-10),anchura/2-10, 0+i*xnumpix_um);
	}

    for(i=anchura/xnumpix_um/2+1; i<anchura; i++){
		cd.strokeText(i-10,anchura/2-10, altura-i*xnumpix_um);
	}

    for(i=altura/xnumpix_um/2+1; i<altura; i++){
		cd.strokeText(i-10,0+i*xnumpix_um,altura/2-10);
	}

    for(i=altura/xnumpix_um/2+1; i<altura; i++){
		cd.strokeText("-"+(i-10), altura-i*xnumpix_um,altura/2-10);
	}
}

//Solución para resolver ecuaciones 
// ax + by = c
// dx + ey = f
function s2e1(a, b, c, d, e, f, arrxy){
	arrxy[1] = (a*f-d*c)/(a*e-d*b);  // valor de y
	arrxy[0] = (c-b*arrxy[1])/a // valor de x

    if( arrxy[1].toString() == "NaN" || arrxy[0].toString() == "NaN")
    {
        document.getElementById("error").innerHTML = "No hay solución, las ecuaciones son equivalentes (NaN)";
    }
    else if (arrxy[1].toString() == "Infinity" || arrxy[0].toString() == "Infinity")
    {
        document.getElementById("error").innerHTML = "No hay solución, las rectas son paralelas (Infinity)";
    }
}

//Ecuación 1 dibujar punto y linea
function DibujarPunto(a,b,c,x1, x2, arrpunto)
{
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000"; 
    //Dibujar punto de inicio
    const circle1 = new Path2D();
    ctx.strokeStyle = "blue";
    circle1.arc(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle1);
    //Dibujar punto de final
    const circle2 = new Path2D();
    circle2.arc(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle2);
    
    ctx.beginPath();
    ctx.moveTo(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2));
    ctx.lineTo(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2)); //Dibujar el trazo
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#000000"; 
    ctx.strokeText("("+a+"x + "+b+"y = "+c+")", x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2)); //Dibujar la ecuación en la cuadricula

}
//Ecuación 2 dibujar punto y linea
function DibujarPuntos(d,e,f,x1, x2, arrpunto)
{
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000"; 
    //Punto de inicio 
    const circle1 = new Path2D();
    ctx.strokeStyle = "green";
    circle1.arc(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle1);
    //Punto de final 
    const circle2 = new Path2D();
    circle2.arc(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle2);

    ctx.beginPath();
    ctx.moveTo(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2));
    ctx.lineTo(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2));
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#000000"; 
    ctx.strokeText("("+d+"x + "+e+"y = "+f+")", x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2)); //Dibujar la ecuación en la cuadricula

}
//Dibujar punto rojo donde se intersectan las lineas
function DibujarCruce(arrpunto){
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#c82124"; 
    const circle1 = new Path2D();
    circle1.arc(arrpunto[0]*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),3,0,360*Math.PI);
    ctx.font = "12px serif";
    ctx.strokeStyle = "#c82124"; 
    ctx.strokeText("("+arrpunto[0]+", "+arrpunto[1]+")", arrpunto[0]*20+canvas.width/2+10, -1*(arrpunto[1]*20-canvas.height/2));
    ctx.fill(circle1);
}