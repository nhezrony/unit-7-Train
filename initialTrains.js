var config = {
    apiKey: "AIzaSyDGwLVIrDNb_4scAzpfwxDgKz7o4B5s33s",
    authDomain: "trainscheduler-e08a0.firebaseapp.com",
    databaseURL: "https://trainscheduler-e08a0.firebaseio.com",
    projectId: "trainscheduler-e08a0",
    storageBucket: "trainscheduler-e08a0.appspot.com",
    messagingSenderId: "897388412392"
};
firebase.initializeApp(config);
var database = firebase.database()
var ref = database.ref()
var train1 = {
    name: "Toronto express",
    city: "Toronto",
    province: "Ontario",
    firstDeparture: "12:00",
    frequency: 90
}
var train2 = {
    name: "Montreal express",
    city: "Montreal",
    province: "Quebec",
    firstDeparture: "1:30",
    frequency: 180
}
var train3 = {
    name: "Vancouver express",
    city: "Vancouver",
    province: "British Columbia",
    firstDeparture: "12:00",
    frequency: 165
}
var train4 = {
    name: "Calgary express",
    city: "Calgary",
    province: "Alberta",
    firstDeparture: "3:00",
    frequency: 90
}
var train5 = {
    name: "Edmonton express",
    city: "Edmonton",
    province: "Alberta",
    firstDeparture: "14:30",
    frequency: 180
}
var train6 = {
    name: "Ottawa-Gatineau express",
    city: "Ottawa-Gatineau",
    province: "Ontario/Quebec",
    firstDeparture: "9:00",
    frequency: 30
}
var train7 = {
    name: "Winnipeg express",
    city: "Winnipeg",
    province: "Manitoba",
    firstDeparture: "8:00",
    frequency: 165
}
var train8 = {
    name: "Quebec City express",
    city: "Quebec City",
    province: "Quebec",
    firstDeparture: "6:00",
    frequency: 15
}
var train9 = {
    name: "Hamilton express",
    city: "Hamilton",
    province: "Ontario",
    firstDeparture: "17:00",
    frequency: 10
}
var train10 = {
    name: "Waterloo express",
    city: "Kitchener Waterloo Cambridge",
    province: "Ontario",
    firstDeparture: "12:00",
    frequency: 720
}
var trainRef = ref.child("trains")
trainRef.push(train1)
trainRef.push(train2)
trainRef.push(train3)
trainRef.push(train4)
trainRef.push(train5)
trainRef.push(train6)
trainRef.push(train7)
trainRef.push(train8)
trainRef.push(train9)
trainRef.push(train10)