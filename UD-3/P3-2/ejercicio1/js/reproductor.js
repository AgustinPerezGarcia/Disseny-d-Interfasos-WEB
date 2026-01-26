var maximo;
var medio, barra, progreso;
var play, reiniciar, retrasar, adelantar;
var silenciar, menosVolumen, masVolumen;
var bucle;

/* ================= BARRA DE PROGRESO ================= */

function redimensionaBarra()
{
	if(!medio.ended)
	{
		var total = parseInt(medio.currentTime * maximo / medio.duration);
		progreso.style.width = total + 'px';
	}
	else
	{
		progreso.style.width = '0px';
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio(e)
{
	if(!medio.paused && !medio.ended)
	{
		var ratonX = e.pageX - barra.offsetLeft;
		var nuevoTiempo = ratonX * medio.duration / maximo;
		medio.currentTime = nuevoTiempo;
		progreso.style.width = ratonX + 'px';
	}
}

/* ================= CONTROLES ================= */

function accionPlay()
{
	if(!medio.paused && !medio.ended) 
	{
		medio.pause();
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
	else
	{
		medio.play();
		play.value = '||';
		bucle = setInterval(redimensionaBarra, 1000);
	}
}

function accionReiniciar()
{
	medio.currentTime = 0;
	medio.play();
	play.value = '||';
	bucle = setInterval(redimensionaBarra, 1000);
}

function accionRetrasar()
{
	if(medio.currentTime > 5)
	{
		medio.currentTime -= 5;
	}
	else
	{
		medio.currentTime = 0;
	}
}

function accionAdelantar()
{
	if(medio.currentTime + 5 < medio.duration)
	{
		medio.currentTime += 5;
	}
	else
	{
		medio.currentTime = medio.duration;
	}
}

function accionSilenciar()
{
	if(medio.muted)
	{
		medio.muted = false;
		silenciar.value = 'Silenciar';
	}
	else
	{
		medio.muted = true;
		silenciar.value = 'Escuchar';
	}
}

function accionMenosVolumen()
{
	if(medio.volume > 0)
	{
		medio.volume = Math.max(0, medio.volume - 0.1);
	}
}

function accionMasVolumen()
{
	if(medio.volume < 1)
	{
		medio.volume = Math.min(1, medio.volume + 0.1);
	}
}

/* ================= INICIO ================= */

function iniciar() 
{
	maximo = 700;
	
	medio = document.querySelector('#medio');
	barra = document.querySelector('#barra');
	progreso = document.querySelector('#progreso');
	play = document.querySelector('#play');

	reiniciar = document.querySelector('#reiniciar');
	retrasar = document.querySelector('#retrasar');
	adelantar = document.querySelector('#adelantar');
	silenciar = document.querySelector('#silenciar');
	menosVolumen = document.querySelector('#menosVolumen');
	masVolumen = document.querySelector('#masVolumen');

	play.addEventListener('click', accionPlay, false);
	reiniciar.addEventListener('click', accionReiniciar, false);
	retrasar.addEventListener('click', accionRetrasar, false);
	adelantar.addEventListener('click', accionAdelantar, false);
	silenciar.addEventListener('click', accionSilenciar, false);
	menosVolumen.addEventListener('click', accionMenosVolumen, false);
	masVolumen.addEventListener('click', accionMasVolumen, false);

	barra.addEventListener('click', desplazarMedio, false);
}

window.addEventListener('load', iniciar, false);