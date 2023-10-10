const scriptName = "LostArkBot";
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    const myApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJo dHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNzk1M DEifQ.RlC6BWCOSeH2Zi4g_gOw_6TF4f-kITl6nHOyOrG0U8pSypkPvaWi3danG6IPd2C7qLNBERLteG8ujaLMQFaQ5L5_8iDlUoaZqIBGRSWAJ-A7-WD3p7Jx6pQ19VpxBKEXE8iHrKLISHUL5hz2QPCsw4k M6k7NC5-Gscm5UYcrH-po801BdZYZVQ5pset2AWjr5LPy81KmvWLhJm2vI0B40U3389WZFrNwcgrNtA-vLvfTBdY8QW1BxONxjFOA-bHNPm_VUpkXSS0ko3abasTyxnVfyXnl0A93U-ZDd coOXjnUszrizrgcPbsP3D2EZl76AwmPrL175BRjJ_SQeie-ylA";
    const roomName = room;
    const msgInfo = msg;
    const msgCmd = msgInfo.split(" ")[0];
    const msgParam = msgInfo.split(" ")[1];
    let getApiJsonData;

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
        default:
            replier.reply("죄송합니다. 명령을 찾을수 없습니다. 다시 한번 확인해 주세요.");
    }


    function testFun() {
        replier.reply("테스트");
    }



    function callLostArkApi(url) {
        let data = org.jsoup.Jsoup.connect(url)
            .header("accept", "application/json")
            .header("authorization", myApiKey)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .get().text();
        getApiJsonData = JSON.parse(data);
    }

    function infoEquipment(msgParam) {
        replier.reply("테스트");
        const user_name = msgParam;
        const url = "https://developer-lostark.game.onstove.com/armories/characters/" + user_name + "/equipment";
        callLostArkApi(url);
        let qualityValueAvg = 0;
        let equipmentData;
        replier.reply(getApiJsonData[0]["Type"]);
        for (let i = 0; i < 6; i++) {
            let equipmentTooltip = JSON.parse(getApiJsonData[i]["Tooltip"]);
            let itemQualityValue = equipmentTooltip["Element_001"]["value"]["qualityValue"];
            let equipmentInfo = getApiJsonData[i]["Type"] + " " +
                getApiJsonData[i]["Grade"] + " " +
                getApiJsonData[i]["Name"] + " : " +
                itemQualityValue

            equipmentData.push(equipmentInfo);
            qualityValueAvg += itemQualityValue;
        }
        qualityValueAvg /= 6;
        qualityValueAvg = qualityValueAvg.toFixed(2);
        equipmentData.push("품질 평균: " + qualityValueAvg);
        const separatedData = equipmentData.join('\n');
        replier.reply(separatedData);
    }

}
