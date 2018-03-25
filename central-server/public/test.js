var data = {}
data['services'] = {}
data.services['police'] = true;
data.services['fire'] = false;
data.services['medical'] = false;

data["location.coordinates"] = {}
data["location.coordinates"].lat = 34.32334;
data["location.coordinates"].lng = -117.3343;
data["location.coordinates"].accuracy= 5;
console.log(JSON.stringify(data));