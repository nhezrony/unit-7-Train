function Train(name, city, province, firstDeparture, frequency) {
    this.name = name;
    this.city = city;
    this.province = province;
    this.firstDeparture = firstDeparture;
    this.frequency = frequency;
}
Train.prototype.createNewRow = function () {
    let firstDeparture = moment(this.firstDeparture, 'HH:mm')
    let time = moment()
    let minutesAway = firstDeparture.diff(time, 'minutes')
    let trainCount = 0
    let trainsPerDay = Math.abs(Math.floor((firstDeparture.diff(moment().endOf("day"), 'minutes')) / this.frequency)) - 1
    while (minutesAway < 0) {
        minutesAway += this.frequency
        trainCount++;
    }
    nextDeparture = time.add(minutesAway, 'minutes')
    if (!nextDeparture.isBetween(firstDeparture, moment().endOf("day"))) {
        nextDeparture = firstDeparture
    }
    ((trainCount == trainsPerDay) ? minutesAway = `Warning the Last Train for The day will be arriving in ${minutesAway} Minutes` : minutesAway = minutesAway)

    var $row = $('<tr>');
    var $name = $('<td>', {
        text: this.name
    });
    var $destination = $('<td>', {
        text: `${this.city}, ${this.province}`
    });
    var $frequency = $('<td>', {
        text: this.frequency
    });
    var $nextArrival = $('<td>', {
        text: nextDeparture.format('HH:mm')
    });
    var $minutesAway = $('<td>', {
        text: minutesAway
    });
    $('tbody').append($row.append($name, $destination, $frequency, $nextArrival, $minutesAway))
}
var config = {
    apiKey: "AIzaSyDGwLVIrDNb_4scAzpfwxDgKz7o4B5s33s",
    authDomain: "trainscheduler-e08a0.firebaseapp.com",
    databaseURL: "https://trainscheduler-e08a0.firebaseio.com",
    projectId: "trainscheduler-e08a0",
    storageBucket: "trainscheduler-e08a0.appspot.com",
    messagingSenderId: "897388412392"
};

function TimePicker(type, currentTime) {
    var $dropdown = $('<div>');
    var $button = $('<button>', {
        class: `btn btn-secondary dropdown-toggle mr-1`,
        id: `${type}Btn`,
        type: "button",
        'data-toggle': "dropdown",
        text: currentTime
    });
    var $menu = $('<div>', {
        class: "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
    });

    function populateDropdown() {
        ((type == 'hour' ? count = 24 : count = 60))
        for (var i = 0; i < count; i++) {
            var $option = $('<a>', {
                class: `dropdown-item ${type}-dropdown-item`,
                id: i,
                text: ((i <= 9) ? `0${i}` : i)
            });
            $menu.append($option)
        }
    }
    populateDropdown()
    $('#timePicker').append($dropdown.append($button, $menu))
}
var hours = new TimePicker('hour', moment().hours())
var minutes = new TimePicker('minutes', moment().minutes())

firebase.initializeApp(config);
var database = firebase.database()
var ref = database.ref()
var trainRef = ref.child("trains")
trainRef.on('value', gotData, errData)

function errData(err) {
    console.log(`error ${err}`)
}

function gotData(data) {
    var rawData = data.val()
    var keys = Object.keys(rawData)
    for (keys in rawData) {
        train = rawData[keys]
        var currentTrain = new Train(train.name, train.city, train.province, train.firstDeparture, train.frequency)
        currentTrain.createNewRow()
    }
}

var newFirstDeparture = [00, ':', 00]
$('.hour-dropdown-item').on('click', function () {
    $('#hourBtn').html(this.id)
    newFirstDeparture[0] = this.id
})
$('.minutes-dropdown-item').on('click', function () {
    $('#minutesBtn').html(this.id)
    newFirstDeparture[2] = this.id
})

$('#newTrain').submit(function () {
    event.preventDefault()
    var name = $("#name").val()
    var city = $("#city").val()
    var province = $("#province").val()
    var firstDeparture = `${newFirstDeparture[0]}:${newFirstDeparture[2]}`
    var frequency = parseInt($("#frequency").val())
    var newTrain = new Train(name, city, province, firstDeparture, frequency)
    trainRef.push(newTrain)
    location.reload()
});