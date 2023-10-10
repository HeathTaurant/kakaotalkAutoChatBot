const scriptName = "LostArkBot";
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    const myApiKey = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNzk1MDEifQ.RlC6BWCOSeH2Zi4g_gOw_6TF4f-kITl6nHOyOrG0U8pSypkPvaWi3danG6IPd2C7qLNBErLteG8ujaLMQFaQ5L5_8iDlUoaZqIBGRSWAJ-A7-WD3p7Jx6pQ19VpxBKEXE8iHrKLISHUL5hz2QPCsw4kM6k7NC5-Gscm5UYcrH-po801BdZYZVQ5pset2AWjr5LPy81KmvWLhJm2vI0B40U3389WZFrNwcgrNtA-vLvfTBdY8QW1BxONxjFOA-bHNPm_VUpkXSS0ko3abasTyxnVfyXnl0A93U-ZDdcOXjnUszrizrgcPbsP3D2EZl76AwmPrL175BRjJ_SQeie-ylA";
    const roomName = room;
    const msgInfo = msg;
    const msgCmd = msgInfo.split(" ")[0];
    const msgParam = msgInfo.split(" ")[1];

    switch (roomName) {
        case roomName = "Master":
            break;
        default:
            return;
    }

    switch (msgCmd) {
        case msgCmd = "/테스트":
            testFun();
            break;
        case msgCmd = "/장비":
            infoEquipment(msgParam);
            break;
        case msgCmd = "/캐릭터":
            siblingsCharacters(msgParam);
            break;
        default:
            return;
    }


    function testFun() {
        replier.reply("테스트");
    }



    function callLostArkApi(url, callback) {
        let data = org.jsoup.Jsoup.connect(url)
            .header("accept", "application/json")
            .header("authorization", myApiKey)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .get().text();
            const apiJsonData = JSON.parse(data);
        callback(apiJsonData);
        
    }

    function siblingsCharacters(msgParam) {
        replier.reply("캐릭터 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
        const user_name = msgParam;
        const url = "https://developer-lostark.game.onstove.com/characters/" + user_name + "/siblings";
        callLostArkApi(url, function(parsedData) {
            replier.reply("캐릭터 정보를 불러왔습니다.");
            let characterData = [];
            for (let i = 0; i < parsedData.length; i++) {
                let characterInfo = parsedData[i]["ServerName"] + " " +
                    parsedData[i]["CharacterName"] + " " +
                    parsedData[i]["ItemAvgLevel"];
                characterData.push(characterInfo);
            }
            const separatedData = characterData.join('\n');
            replier.reply(separatedData);
        });

    }


    function infoEquipment(msgParam) {
        replier.reply("장비 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
        const user_name = msgParam;
        const url = "https://developer-lostark.game.onstove.com/armories/characters/" + user_name + "/equipment";
        callLostArkApi(url, function(parsedData) {
            replier.reply("장비 정보를 불러왔습니다.");
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
    

}
