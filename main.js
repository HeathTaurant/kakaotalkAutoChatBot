const scriptName = "LostArkBot";
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    const roomName = room;
    // 허용 챗방 목록 확인
    switch (roomName) {
        case roomName = "Master":
            break;
        default:
            return;
    }

    const myApiKey = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNzk1MDEifQ.RlC6BWCOSeH2Zi4g_gOw_6TF4f-kITl6nHOyOrG0U8pSypkPvaWi3danG6IPd2C7qLNBErLteG8ujaLMQFaQ5L5_8iDlUoaZqIBGRSWAJ-A7-WD3p7Jx6pQ19VpxBKEXE8iHrKLISHUL5hz2QPCsw4kM6k7NC5-Gscm5UYcrH-po801BdZYZVQ5pset2AWjr5LPy81KmvWLhJm2vI0B40U3389WZFrNwcgrNtA-vLvfTBdY8QW1BxONxjFOA-bHNPm_VUpkXSS0ko3abasTyxnVfyXnl0A93U-ZDdcOXjnUszrizrgcPbsP3D2EZl76AwmPrL175BRjJ_SQeie-ylA";

    const msgInfo = msg;
    const msgCmd = msgInfo.split(" ")[0];
    const msgParam = msgInfo.split(" ")[1];
    const lostarkApiUrl = "https://developer-lostark.game.onstove.com/";


    switch (msgCmd) {
        case msgCmd = "/테스트":
            testFun(msgParam);
            break;
        case msgCmd = "/부캐":
            siblingsCharacters(msgParam);
            break;
        case msgCmd = "/장비":
            infoEquipment(msgParam);
            break;
        case msgCmd = "/정보":
            characterInfo(msgParam);
        default:
            return;
    }

    function chackUserNames() {
        if (msgParam == null) {
            return;
        }
    }

    // 로스트아크 API 호출
    function callLostArkApi(url, callback) {
        const apiUrl = lostarkApiUrl + url;
        try {
            let data = org.jsoup.Jsoup.connect(apiUrl)
                .header("accept", "application/json")
                .header("authorization", myApiKey)
                .ignoreContentType(true)
                .ignoreHttpErrors(true)
                .get().text();
            const apiJsonData = JSON.parse(data);
            if (apiJsonData.length > 0) {
                callback(apiJsonData);
            } else {
                replier.reply("데이터를 찾을 수 없습니다. 명령어를 다시 확인해 주세요.");
                return;
            }
        } catch (e) {
            replier.reply("오류가 발생했습니다. 관리자에게 문의해주세요.");
            replier.reply(e);
        }
    }

    // 2023-09-26
    // 캐릭터 클래스 이름 약어
    function characterClassNameChageAbbreviation(characterClassName) {
        switch (characterClassName) {
            case characterClassName = "워로드":
                return "워붕";
            case characterClassName = "버서커":
                return "버붕";
            case characterClassName = "디스트로이어":
                return "디붕";
            case characterClassName = "홀리나이트":
                return "홀나";

            case characterClassName = "슬레이어":
                return "슬레";

            case characterClassName = "배틀마스터":
                return "배마";
            case characterClassName = "인파이터":
                return "인파";
            case characterClassName = "기공사":
                return "기공";
            case characterClassName = "창술사":
                return "창술";

            case characterClassName = "스트라이커":
                return "스커";

            case characterClassName = "데빌헌터":
                return "데헌";
            case characterClassName = "블래스터":
                return "블래";
            case characterClassName = "호크아이":
                return "호크";
            case characterClassName = "스카우터":
                return "스카";

            case characterClassName = "건슬링어":
                return "건슬";

            case characterClassName = "아르카나":
                return "알카";
            case characterClassName = "서머너":
                return "섬너";
            case characterClassName = "바드":
                return "바드";
            case characterClassName = "소서리스":
                return "소서";


            case characterClassName = "데모닉":
                return "뎀닉";
            case characterClassName = "블레이드":
                return "블레";
            case characterClassName = "리퍼":
                return "리퍼";
            case characterClassName = "소울이터":
                return "소울";

            case characterClassName = "도화가":
                return "아가";
            case characterClassName = "기상술사":
                return "기상";

            default:
                return characterClassName;
        }
    }


    // 부캐 정보
    // 2023_09_26
    // 실리안
    // 1,620.00 아가 애기곰은애교쟁이
    function siblingsCharacters(msgParam) {
        const user_name = msgParam;
        const url = "characters/" + user_name + "/siblings";
        let serverNameListCheck = "서버이름";
        let countForBlank = 0;
        callLostArkApi(url, function (parsedData) {
            parsedData.sort((a, b) => {
                let aAvgLevel = parseFloat(a.ItemAvgLevel.replace(',', ''));
                let bAvgLevel = parseFloat(b.ItemAvgLevel.replace(',', ''));
                return bAvgLevel - aAvgLevel;
            });
            let characterData = [];
            for (let i = 0; i < parsedData.length; i++) {
                let classAbbreviation = characterClassNameChageAbbreviation(parsedData[i]["CharacterClassName"]);
                if (serverNameListCheck != parsedData[i]["ServerName"]) {
                    serverNameListCheck = parsedData[i]["ServerName"];
                    if (countForBlank == 1) {
                        characterData.push("");
                    }
                    characterData.push(serverNameListCheck);
                } else if (countForBlank == 0) {
                    countForBlank = 1
                }

                let characterInfo = "[" +
                    classAbbreviation + "] " +
                    parsedData[i]["ItemAvgLevel"] + " " +
                    parsedData[i]["CharacterName"];

                characterData.push(characterInfo);
            }
            const separatedData = characterData.join('\n');
            replier.reply(separatedData);
        });
    }


    //캐릭터 정보
    function characterInfo(msgParam) {
        replier.reply("캐릭터 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
        const user_name = msgParam;
        const url = "armories/characters/" + user_name;
        callLostArkApi(url, function (parsedData) {
            replier.reply("캐릭터 정보를 불러왔습니다.");
            let characterData = [];
            let characterInfo = parsedData["CharacterName"] + " " +
                parsedData["ServerName"] + " " +
                parsedData["Level"] + " " +
                parsedData["ItemLevel"] + " " +
                parsedData["AdventureName"] + " " +
                parsedData["AdventureLevel"];
            characterData.push(characterInfo);
            const separatedData = characterData.join('\n');
            replier.reply(separatedData);
        });
    }


    //장비 정보
    function infoEquipment(msgParam) {
        const user_name = msgParam;
        const url = "armories/characters/" + user_name + "/equipment";
        callLostArkApi(url, function (parsedData) {
            let qualityValueAvg = 0;
            let equipmentData = [];
            for (let i = 0; i < 6; i++) {
                let equipmentTooltip = JSON.parse(parsedData[i]["Tooltip"]);
                let itemQualityValue = equipmentTooltip["Element_001"]["value"]["qualityValue"];
                let equipmentInfo = parsedData[i]["Type"] + " " +
                    parsedData[i]["Grade"] + " " +
                    parsedData[i]["Name"] + " : " +
                    itemQualityValue;
                equipmentData.push(equipmentInfo);
                qualityValueAvg += itemQualityValue;
            }

            qualityValueAvg /= 6;
            qualityValueAvg = qualityValueAvg.toFixed(2);
            equipmentData.push("품질 평균: " + qualityValueAvg);
            const separatedData = equipmentData.join('\n');
            replier.reply(separatedData);
        });
    }

    function callLostArkApiPost(url, selectCategoryCode, callback) {
        let HttpURLConnection = Java.type('java.net.HttpURLConnection');
        let URL = Java.type('java.net.URL');
        let BufferedReader = Java.type('java.io.BufferedReader');
        let InputStreamReader = Java.type('java.io.InputStreamReader');
        let DataOutputStream = Java.type('java.io.DataOutputStream');
        let apiUrl = lostarkApiUrl + url; // Ensure lostarkApiUrl is defined
        try {
            let urlObj = new URL(apiUrl);
            let con = urlObj.openConnection();
            con.setRequestMethod("POST");

            // Set Headers
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Authorization", myApiKey); // Ensure myApiKey is defined
            con.setRequestProperty("Content-Type", "application/json");

            // Send Post Data
            con.setDoOutput(true);
            let wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(JSON.stringify(selectCategoryCode));
            wr.flush();
            wr.close();

            // Get the response
            let responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                let inReader = new BufferedReader(new InputStreamReader(con.getInputStream()));
                let inputLine;
                let response = new java.lang.StringBuffer();

                while ((inputLine = inReader.readLine()) != null) {
                    response.append(inputLine);
                }
                inReader.close();

                // Now 'response' contains the whole response
                // Parse it or process it as you need
                let responseData = JSON.parse(response.toString()); // Assuming the response is in JSON format
                return (callback); // Replace 'println' with actual logging or processing function

            } else {
                println("POST request not worked"); // Replace 'println' with actual logging or error handling function
            }

        } catch (e) {
            println("Error occurred: " + e.toString()); // Replace 'println' with actual logging or error handling function
        }


    }
    function testFun() {
        const url = "/markets/items";
        const selectCategoryCode = { "CategoryCode": 50000 };
        callLostArkApiPost(url, selectCategoryCode, function (callback) {
            const separatedData = callback.join('\n');
            replier.reply(separatedData);
        });
    }
}
