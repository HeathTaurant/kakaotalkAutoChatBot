const roomName = room;
const msgInfo = msg;
const msgCmd = msgInfo.split(" ")[0];
const msgParam = msgInfo.split(" ")[1];
let getApiJsonData = [];

if (roomName === "듀얼지히") {
    switch (msgCmd) {
        case "/테스트":
            testChar(msgParam, getApiJsonData, replier, myApiKey);
            break;
        default:
            replier.reply("죄송합니다. 명령을 찾을 수 없습니다. 다시 한번 확인해 주세요.");
    }
}

function testChar(msgParam, getApiJsonData, replier, myApiKey) {
    replier.reply("테스트");
    const user_name = msgParam;
    const url = "https://developer-lostark.game.onstove.com/armories/characters/" + user_name + "/equipment";
    getApiJsonData.length = 0; // 배열 초기화

    try {
        const data = org.jsoup.Jsoup.connect(url)
            .header("accept", "application/json")
            .header("authorization", myApiKey)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .get().text();

        if (data) {
            replier.reply("데이터 확인" + data);
            const response = JSON.parse(data); // 데이터가 정상적으로 있을 때만 파싱
            if (response.length > 0) {
                replier.reply("데이터 파싱 완료");
                let qualityValueAvg = 0;
                let equipmentData = [];
                replier.reply(response[0]["Type"]);
                for (let i = 0; i < 6; i++) {
                    let equipmentTooltip = JSON.parse(response[i]["Tooltip"]);
                    let itemQualityValue = equipmentTooltip["Element_001"]["value"]["qualityValue"];
                    let equipmentInfo = response[i]["Type"] + " " +
                        response[i]["Grade"] + " " +
                        response[i]["Name"] + " : " +
                        itemQualityValue;

                    equipmentData.push(equipmentInfo);
                    qualityValueAvg += itemQualityValue;
                }
                qualityValueAvg /= 6;
                qualityValueAvg = qualityValueAvg.toFixed(2);
                equipmentData.push("품질 평균: " + qualityValueAvg);
                const separatedData = equipmentData.join('\n');
                replier.reply(separatedData);
            } else {
                replier.reply("데이터 파싱이 되지 않았습니다.");
            }
        } else {
            replier.reply("데이터를 가져올 수 없습니다.");
        }
    } catch (error) {
        replier.reply("테스트 중 오류가 발생했습니다.");
        console.error(error);
    }
}



let samplePostJson = {
    "Sort": "GRADE",
    "CategoryCode": 0,
    "CharacterClass": "string",
    "ItemTier": null,
    "ItemGrade": "string",
    "ItemName": "string",
    "PageNo": 0,
    "SortCondition": "ASC"
}

{
    "Sort": "GRADE",
        "CategoryCode": 50000,
            "CharacterClass": "",
                "ItemTier": null,
                    "ItemGrade": "",
                        "ItemName": "파괴",
                            "PageNo": 0,
                                "SortCondition": "ASC"
}


var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var requestP = require('request-promise');
var phantom = require('phantom');
var bodyParser = require('body-parser');
var fs = require('fs');

//to set router
function setRouter() {
    //public 내의 파일들 업로드
    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.send('kakaobot Jinsu')
    })
}

//to get a screenshot to send
//in this case, it's naver weather
async function autoWeather() {
    var url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8';
    var instance = await phantom.create();
    var page = await instance.createPage();
    var status = await page.open(url);
    console.log("page status : " + status);
    var clipRect = await page.evaluate(function () {
        return document.querySelector('[class="table_info weekly _weeklyWeather"]').getBoundingClientRect();
    });

    page.property('clipRect', {
        top: clipRect.top,
        left: clipRect.left,
        width: clipRect.width,
        height: clipRect.height
    });
    page.render('./public/weather.png');

    console.log('autoWeahter finished in funciton')
}


//to get naver searching ranks
//this returns a Promise
async function autoSearch() {
    var url = "https://www.naver.com/";
    var rank_str = "";

    //@@여기를 callback말고 Promise, await으로 구성해보는 게 깔끔할듯?
    await requestP(url, function (error, response, html) {
        if (error) {
            console.log('search request err : ' + err);
            throw error;
        }

        var $ = cheerio.load(html);
        var cnt = 0;

        $('.ah_item').each(function () {
            if (cnt < 10) {
                var str = $(this).text();
                cnt++;
                rank_str += cnt + " : " + str.substr(4, str.length - 6) + "\n";
            }
        })
        //console.log("autoSearch finished in the function");
    });

    return new Promise((resolve, reject) => {
        //console.log('rank : '+rank_str)
        resolve(rank_str);
    });
}


setRouter();
autoWeather();
autoSearch();

//to parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//the object to be sent as keyboard data
const keyboardContents = {
    type: 'buttons',
    buttons: ["날씨", "네이버 검색 순위", "Bus", "Jinsu--^_^"]
};


//the inital state
app.get('/keyboard', function (req, res) {
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(keyboardContents));
    console.log("someone GET /keyboard");
});

//response to clients' msg
app.post('/message', async function (req, res) {
    const _obj = {
        userKey: req.body.userKey,
        type: req.body.type,
        content: req.body.content
    };

    //keyboardContents는 항상 들어감
    var responseContents = {
        keyboard: keyboardContents
    };

    //확인용
    //console.log('userType : '+_obj.type)
    console.log('userContents : ' + _obj.content)


    //네이버 검색 순위
    if (_obj.content == '날씨') {
        var rank = await autoSearch();
        //console.log('autoSearch finished in message')

        //@@message에 keyboard안넣으면 다시 default인 텍스트로 감??
        responseContents.message = {
            "photo": {
                //@@내 컴퓨터에 있는 이미지는 불가능한듯..
                "url": "http://124.50.93.166:3500/weather.png",
                "width": 588,
                "height": 228
            }
        };
    }
    else if (_obj.content == '네이버 검색 순위') {
        var rank = await autoSearch();
        //console.log('autoSearch finished in message')

        //@@message에 keyboard안넣으면 다시 default인 텍스트로 감??
        responseContents.message = {
            "text": rank
        };
    }


    //추후에 버스 도착정보 넣을 것
    else if (_obj.content == 'Bus') {
        responseContents.message = {
            "text": '준비 중...ㅎㅎㅎ'
        };
    }

    else if (_obj.content == 'Jinsu--^_^') {
        responseContents.message = {
            "text": '진수는 정말.. 멋져...',
            "photo": {
                //@@내 컴퓨터에 있는 이미지는 불가능한듯..
                "url": "http://124.50.93.166:3500/jinsu.png",
                "width": 457,
                "height": 133
            }
        };
    }

    //send response
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(responseContents));

});
app.listen(3500, function () {
    console.log('app is listening to 3500')
});

// ------------------------------------------------------------
var URL = java.net.URL;
var HttpURLConnection = java.net.HttpURLConnection;

function sendPostRequest(url, jsonData) {
    try {
        var obj = new URL(url);
        var con = obj.openConnection();
        con.setRequestMethod("POST");

        // Set headers
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");

        // Enable input/output streams
        con.setDoOutput(true);

        // Write JSON data to output stream
        var out = new java.io.OutputStreamWriter(con.getOutputStream());
        out.write(jsonData);
        out.flush();
        out.close();

        var responseCode = con.getResponseCode();
        println("POST Response Code : " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK) { // success
            var inReader = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
            var inputLine;
            var response = new java.lang.StringBuffer();

            while ((inputLine = inReader.readLine()) != null) {
                response.append(inputLine);
            }
            inReader.close();

            // Print result
            println(response.toString());
        } else {
            println("POST request failed");
        }
    } catch (e) {
        println("Error: " + e);
    }
}

var apiUrl = "YOUR_API_ENDPOINT"; // Replace with your API endpoint
var jsonData = JSON.stringify({
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
});

sendPostRequest(apiUrl, jsonData);



// ------------------------------------------------------------
function callLostArkApiPost(url, selectCategoryCode, callback) {
    var HttpURLConnection = Packages.java.net.HttpURLConnection;
    var URL = Packages.java.net.URL;
    var BufferedReader = Packages.java.io.BufferedReader;
    var InputStreamReader = Packages.java.io.InputStreamReader;
    var OutputStreamWriter = Packages.java.io.OutputStreamWriter;
    var apiUrl = lostarkApiUrl + url;
    try {
        var urlObj = new URL(apiUrl);
        var con = urlObj.openConnection();
        con.setRequestMethod("POST");

        con.setRequestProperty("Accept", "application/json");
        con.setRequestProperty("Authorization", myApiKey);
        con.setRequestProperty("Content-Type", "application/json");

        con.setDoOutput(true);
        var outStream = con.getOutputStream();
        var writer = new OutputStreamWriter(outStream);
        writer.write(JSON.stringify(selectCategoryCode)); // Ensure selectCategoryCode is an object
        writer.flush();
        writer.close();

        var responseCode = con.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            // ... (other codes)

            // Assume responseData is the parsed response object
            callback(responseData); // Call the callback function with responseData as argument
        } else {
            print("POST request not worked: " + responseCode);
            // Optionally, you might want to call the callback with an error or error code
            // callback({ error: 'Request failed', statusCode: responseCode });
        }
    } catch (e) {
        print("Error occurred: " + e);
        // Optionally, you might want to call the callback with the error
        // callback({ error: 'Exception thrown', exception: e });
    }
}


