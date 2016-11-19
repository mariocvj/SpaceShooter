




//	AIs[] is a list of elements of format [pilotAiClass,shipClass], so each element is a list of 2 elements
function removeAi(ship){
	AIs.forEach(element =>{
		if (element[0]==ship){
			array.splice(index, 1);
		}
	})
}
