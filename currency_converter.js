//converts on the click of the button
var btn = document.getElementById("btn");
btn.addEventListener("click",convert);
//function for the whole proccess
function convert(){
var conversionRates;
var countries;
var url;
//url for currencies codes(short forms e.g USD, NGN)
const countriesUrl = "https://v6.exchangerate-api.com/v6/1c1d2c7fac1d2e6deb4303c4/codes";
fetch(countriesUrl).then(function(response){
	return response.json();
}).then(function(data){
	countries = data.supported_codes;
	let selectedRate1; let selectedRate2;
	//loop for selectable options
	var i = 0;
	while(i < countries.length){
		var value = countries[i];
		var select = document.querySelector("#select1");
		var select2 = document.querySelector("#select2");
		var option = document.createElement("option");
		option.setAttribute("value",value[0]);
		option.innerHTML= value[1];
		var option2 = document.createElement("option");
		option2.setAttribute("value",value[0]);
		option2.innerHTML= value[1];
		select.appendChild(option);
		select2.appendChild(option2);
		i++;
		selectedRate1 = document.getElementById("select1").value;
		selectedRate2 = document.getElementById("select2").value;
	}
	//url for exchange rates
	url = "https://v6.exchangerate-api.com/v6/1c1d2c7fac1d2e6deb4303c4/latest/" + selectedRate1;
	fetch(url).then(function(response){
		return response.json();
	}).then(function(data){
		conversionRates = data.conversion_rates;
		const amount = document.getElementById("amount").value;
		//multiplying by exchange rate
		var result = amount * conversionRates[selectedRate2];
	output.innerHTML= "<h1>"+ amount + " "+selectedRate1 +" is equivalent to "+ result +" "+ selectedRate2 +"</h1>" ;	
});
});
}
//to load all urls before starting to convert
window.onload= function(){
convert();
}