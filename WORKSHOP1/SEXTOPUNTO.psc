Algoritmo SEXTOPUNTO
	Escribir "Escribir un programa que lea 5 precios de 5 productos y calcule el subtotal de los productos, el IVA y el total Neto"
	Escribir "Escriba el primer precio"
	Leer numerouno
	Escribir "Escriba el segundo precio"
	Leer numerodos
	Escribir "Escriba el tercer precio"
	Leer numerotres
	Escribir "Escriba el cuarto precio"
	Leer numerocuatro
	Escribir "Escriba el quinto precio"
	Leer numerocinco
	subtotal<-numerouno+numerodos+numerotres+numerocuatro+numerocinco
	iva<-(numerouno+numerodos+numerotres+numerocuatro+numerocinco)*0.19
	totalneto<-(numerouno+numerodos+numerotres+numerocuatro+numerocinco+iva)
	Escribir "El sub total es " subtotal
	Escribir "El iva total es " iva
	Escribir "El total neto es " totalneto
FinAlgoritmo