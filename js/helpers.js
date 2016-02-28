function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var uniqueId = function () {
  return parseInt(Math.random().toString(36).substr(2, 9));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createUser() {
    return {
        "id" : getRandomInt(1,200),
        "name" : "",
        "type" : "",
        "color" : getRandomColor(),
        "sounds" : [{
            "key": "k",
            "code": "notes(64, 66)"
        },{
            "key": "l",
            "code": "notes(80, 50)"
        },{
            "key": "j",
            "code": "notes(68, 72)"
        },{
            "key": "n",
            "code": "beat(4)"
        }]
    }
}
