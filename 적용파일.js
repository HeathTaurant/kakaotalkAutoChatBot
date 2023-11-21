const scriptName = "LostArkBot";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (!msg.includes("/")) {
        return;
    }

    const roomName = room;
    const chackGroupChat = isGroupChat;
    const lostArkBotVersion = "V_1.23.11.21.13.00";
    const myApiKey = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNzk1MDEifQ.RlC6BWCOSeH2Zi4g_gOw_6TF4f-kITl6nHOyOrG0U8pSypkPvaWi3danG6IPd2C7qLNBErLteG8ujaLMQFaQ5L5_8iDlUoaZqIBGRSWAJ-A7-WD3p7Jx6pQ19VpxBKEXE8iHrKLISHUL5hz2QPCsw4kM6k7NC5-Gscm5UYcrH-po801BdZYZVQ5pset2AWjr5LPy81KmvWLhJm2vI0B40U3389WZFrNwcgrNtA-vLvfTBdY8QW1BxONxjFOA-bHNPm_VUpkXSS0ko3abasTyxnVfyXnl0A93U-ZDdcOXjnUszrizrgcPbsP3D2EZl76AwmPrL175BRjJ_SQeie-ylA";
    const msgInfo = msg;
    const msgCmd = msgInfo.split(" ")[0];
    const msgParam = msgInfo.split(" ")[1];
    const lostarkApiUrl = "https://developer-lostark.game.onstove.com/";

    switch (msgCmd) {
        case "/명령어":
            const baseMsg = "안녕하세요. 애곰봇입니다." + "\n"
            + "버전 : " + lostArkBotVersion + "\n"
            + "아래는 현재 사용 가능한 명령어 입니다." + "\n"
            + "문의사항 및 건의, 버그 제보는 애기곰에게 문의해주세요." + "\n"
            + "명령어 목록입니다." + "\n"
            + "\n"
            + "/부캐 캐릭터이름" + "\n"
            + "/장비 캐릭터이름" + "\n"
            + "/정보 캐릭터이름" + "\n"
            + "\n"
            + "/쌀값" + "\n"
            + "/ㅂㅂㄱ 금액(정수)" + "\n"
            ;
            replier.reply(baseMsg)
            break;
        case "/테스트":
            if (chackUserNames()) {
                testFun(msgParam);
            }
            break;
        case "/부캐":
            if (chackUserNames()) {
                siblingsCharacters(msgParam);
            }
            break;
        case "/장비":
            if (chackUserNames()) {
                infoEquipment(msgParam);
            }
            break;
        case "/정보":
            if (chackUserNames()) {
                characterInfo(msgParam);
            }
            break;
        case "/쌀값":
            mainItemPrice();
            break;
        case "/ㅂㅂㄱ":
            goldDistribute();
            break;
        default:
            break;
    }

    return;
    
    function chackUserNames() {
        const user_name = msgParam;
        if (!user_name || user_name.trim() === "") {
            replier.reply("캐릭터 이름을 입력해주세요.");
            return false;
        }
        return true;
    }

    function callLostArkApi(url, callback) {
        const apiUrl = lostarkApiUrl + url;
        try {
            let response = org.jsoup.Jsoup.connect(apiUrl)
                .header("accept", "application/json")
                .header("authorization", myApiKey)
                .ignoreContentType(true)
                .ignoreHttpErrors(true)
                .execute();

            let data = response.body();
            const apiJsonData = JSON.parse(data);
            if (apiJsonData) {
                callback(apiJsonData);
            } else {
                replier.reply("데이터를 찾을 수 없습니다. 캐릭터명을 다시 확인해 주세요");
                return;
            }
        } catch (e) {
            replier.reply("오류가 발생했습니다. 관리자에게 문의해주세요." + "\n"
                + "Error occurred : " + e + "\n"
                + "statusCode : " + response.statusCode());
            return;
        }
    }
    
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
            writer.write(JSON.stringify(selectCategoryCode));
            writer.flush();
            writer.close();

            var responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                var inReader = new BufferedReader(new InputStreamReader(con.getInputStream()));
                var inputLine;
                var response = new java.lang.StringBuffer();

                while ((inputLine = inReader.readLine()) != null) {
                    response.append(inputLine);
                }
                inReader.close();

                var responseData = JSON.parse(response.toString());
                callback(responseData);

            } else {
                replier.reply("데이터를 찾을 수 없습니다. 명령어를 다시 확인해 주세요.");
                replier.reply("POST request not worked. Response Code: " + responseCode);
                return;
            }
        } catch (e) {
            replier.reply("오류가 발생했습니다. 관리자에게 문의해주세요.");
            replier.reply("Error occurred: " + e);
            return;
        }
    }

    function characterClassNameChageAbbreviation(characterClassName) {
        switch (characterClassName) {
            case "워로드":
                return "워붕";
            case "버서커":
                return "버붕";
            case "디스트로이어":
                return "디붕";
            case "홀리나이트":
                return "홀나";

            case "슬레이어":
                return "슬레";

            case "배틀마스터":
                return "배마";
            case "인파이터":
                return "인파";
            case "기공사":
                return "기공";
            case "창술사":
                return "창술";

            case "스트라이커":
                return "스커";

            case "데빌헌터":
                return "데헌";
            case "블래스터":
                return "블래";
            case "호크아이":
                return "호크";
            case "스카우터":
                return "스카";

            case "건슬링어":
                return "건슬";

            case "아르카나":
                return "알카";
            case "서머너":
                return "섬너";
            case "바드":
                return "바드";
            case "소서리스":
                return "소서";
            case "데모닉":
                return "뎀닉";
            case "블레이드":
                return "블레";
            case "리퍼":
                return "리퍼";
            case "소울이터":
                return "소울";

            case "도화가":
                return "아가";
            case "기상술사":
                return "기상";

            default:
                return characterClassName;
        }
    }
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
                    countForBlank = 1;
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
    function characterInfo(msgParam) {
        const user_name = msgParam;
        const url = "armories/characters/" + user_name;
        let characterInfoMsg = "";
        callLostArkApi(url, function (parsedData) {
            const characterInfo = parsedData;

            if (characterInfo["ArmoryProfile"]["Title"]) {
                characterInfoMsg = characterInfo["ArmoryProfile"]["Title"] + " " + characterInfo["ArmoryProfile"]["CharacterName"] + "\n";
            } else {
                characterInfoMsg = characterInfo["ArmoryProfile"]["CharacterName"] + "\n";
            }
            characterInfoMsg = characterInfoMsg
                + characterInfo["ArmoryProfile"]["CharacterClassName"] + "\n"
                ;

            if (characterInfo["ArmoryEngraving"] && characterInfo["ArmoryEngraving"]["Effects"]) {
                const characterArmoryEngravingEffects = characterInfo["ArmoryEngraving"]["Effects"];
                const characterArmoryEngravingEffectsLength = characterArmoryEngravingEffects.length;
                if (characterArmoryEngravingEffectsLength > 0) {
                    let characterEngravingEffects = characterArmoryEngravingEffects.map(effect => {
                        let effectsName = effect.Name.split(" Lv. ");
                        return { name: effectsName[0], level: effectsName[1] };
                    });

                    characterInfoMsg = characterInfoMsg +
                        characterEngravingEffects.map(effect => effect.name + effect.level).join(" ") + "\n";
                }
            } else {
                characterInfoMsg = characterInfoMsg
                    + "각인 정보가 없습니다." + "\n"
                    ;
            }

            characterInfoMsg = characterInfoMsg + "\n"
                + characterInfo["ArmoryProfile"]["GuildMemberGrade"] + " / " + characterInfo["ArmoryProfile"]["GuildName"] + " / " + characterInfo["ArmoryProfile"]["ServerName"] + "\n"
                + "Lv " + characterInfo["ArmoryProfile"]["ItemAvgLevel"].replace(/,/g, '') + " / " + characterInfo["ArmoryProfile"]["CharacterLevel"] + " / " + characterInfo["ArmoryProfile"]["ExpeditionLevel"] + " (원정대)" + "\n"
                + "스킬포인트 " + characterInfo["ArmoryProfile"]["UsingSkillPoint"] + " / " + characterInfo["ArmoryProfile"]["TotalSkillPoint"] + " "
                ;
            if (characterInfo["ArmoryProfile"]["PvpGradeName"]) {
                characterInfoMsg = characterInfoMsg
                    + "PvP " + characterInfo["ArmoryProfile"]["PvpGradeName"] + "\n"
                    ;
            } else {
                characterInfoMsg = characterInfoMsg
                    + "PvP " + "Unranked" + "\n"
                    ;
            }

            if (characterInfo["ArmoryProfile"]["Stats"]) {
                const stats = characterInfo["ArmoryProfile"]["Stats"];
                let statsInfo = stats.map(stat => ({
                    type: stat["Type"],
                    value: parseInt(stat["Value"], 10)
                }));
                statsInfo.sort((a, b) => b.value - a.value);
                for (let i = 0; i < Math.min(2, statsInfo.length); i++) {

                    characterInfoMsg += statsInfo[i].type + " " + statsInfo[i].value.toLocaleString() + " ";
                }
                characterInfoMsg += "\n";

                for (let i = 2; i < Math.min(5, statsInfo.length); i++) {

                    characterInfoMsg += statsInfo[i].type + " " + statsInfo[i].value + " ";
                }
                characterInfoMsg += "\n";
            }

            if (characterInfo["ArmoryCard"] && characterInfo["ArmoryCard"]["Effects"]) {
                const cardSetEffectLength = characterInfo["ArmoryCard"]["Effects"].length;
                if (cardSetEffectLength > 0 && characterInfo["ArmoryCard"]["Effects"][0]["Items"]) {
                    for (let i = 0; i < cardSetEffectLength; i++) {
                        let cardSetEffectItem = characterInfo["ArmoryCard"]["Effects"][i]["Items"];
                        let cardSetEffectItemLength = cardSetEffectItem.length;
                        if (cardSetEffectItemLength > 0) {
                            if (cardSetEffectItem[cardSetEffectItemLength - 1]["Name"]) {
                                characterInfoMsg = characterInfoMsg
                                    + cardSetEffectItem[cardSetEffectItemLength - 1]["Name"] + "\n"
                                    ;
                            } else {
                                characterInfoMsg = characterInfoMsg
                                    + "카드 세트 효과 정보가 없습니다." + "\n"
                                    ;
                            }
                        } else {
                            characterInfoMsg = characterInfoMsg
                                + "카드 세트 효과 정보가 없습니다." + "\n"
                                ;
                        }
                    }
                }
            } else {
                characterInfoMsg = characterInfoMsg + "\n"
                    + "카드 정보가 없습니다." + "\n"
                    ;
            }

            function changeCollectiblesTypeName(collectiblesTypeName) {
                switch (collectiblesTypeName) {
                    case "모코코 씨앗":
                        return "모코코";
                    case "섬의 마음":
                        return "섬마";
                    case "위대한 미술품":
                        return "미술품";
                    case "거인의 심장":
                        return "거심";
                    case "이그네아의 징표":
                        return "징표";
                    case "항해 모험물":
                        return "모험물";
                    case "세계수의 잎":
                        return "잎";
                    case "오르페우스의 별":
                        return "별";
                    case "기억의 오르골":
                        return "오르골";
                    default:
                        return collectiblesTypeName;
                }
            }
            
            
            const collectiblesLength = characterInfo["Collectibles"].length;
            if (collectiblesLength > 0) {
                characterInfoMsg = characterInfoMsg + "\n";
                const characterCollectibles = characterInfo["Collectibles"];
                let characterCollectiblesInfo = characterCollectibles.map(characterCollectibles => ({
                    type: changeCollectiblesTypeName(characterCollectibles["Type"]),
                    point: parseInt(characterCollectibles["Point"], 10),
                    maxPoint: parseInt(characterCollectibles["MaxPoint"], 10)
                }))
                const listMenualForType = ["섬마", "미술품", "거심", "별", "잎", "모험물", "징표", "모코코", "오르골"];
                characterCollectiblesInfo.sort((a, b) => {
                    let orderA = listMenualForType.indexOf(a.type);
                    let orderB = listMenualForType.indexOf(b.type);

                    
                    if (orderA === -1) orderA = Number.MAX_VALUE;
                    if (orderB === -1) orderB = Number.MAX_VALUE;

                    return orderA - orderB;
                });

                for (let i = 0; i < collectiblesLength; i++) {
                    characterInfoMsg = characterInfoMsg
                        + characterCollectiblesInfo[i].type
                        + ":" + characterCollectiblesInfo[i].point
                        + " "
                        ;

                    if (i == 4) {
                        characterInfoMsg = characterInfoMsg + "\n";
                    }
                }
            }
            replier.reply(characterInfoMsg);
        });
    }

    function testFun(msgParam) {
    
    }
    
    function infoEquipment(msgParam) {
        const user_name = msgParam;
        const url = "armories/characters/" + user_name + "/equipment";
        callLostArkApi(url, function (parsedData) {
            let qualityValueAvg = 0;
            let itemLevelAvg = 0;
            let replyMsg = "";

            for (let i = 0; i < 6; i++) {
                let equipmentTooltip = JSON.parse(parsedData[i]["Tooltip"]);
                let itemQualityValue = equipmentTooltip["Element_001"]["value"]["qualityValue"];
                let itemLevelLongData = equipmentTooltip["Element_001"]["value"]["leftStr2"];
                const itemLovelMatchData = /아이템 레벨 (\d+)/;
                let itemLevel = itemLevelLongData.match(itemLovelMatchData)[1];
                let itemName = parsedData[i]["Name"];
                let itemGrade = parsedData[i]["Grade"];

                let itemInfo = "[" + itemGrade + "] "
                    + "품질 " + itemQualityValue + " "
                    + "[Lv." + itemLevel + "]"
                    ;

                replyMsg = replyMsg + "\n"
                    + itemName + "\n"
                    + itemInfo + "\n"
                    ;

                qualityValueAvg += itemQualityValue;
                itemLevelAvg += parseInt(itemLevel);

                if (equipmentTooltip["Element_008"]["type"] == "IndentStringGroup") {
                    const deleteTag002 = /<[^>]*>/g;
                    const deleteTag001 = /<[^>]+>|\[.*?\]/g;
                    const matchTag001 = /^(.*?Lv\.\d+)/;
                    let checktopStr008 = equipmentTooltip["Element_008"]["value"]["Element_000"]["topStr"];
                    checktopStr008 = checktopStr008 === undefined ? '' : checktopStr008;

                    if (checktopStr008.includes("엘릭서")) {
                        let elixirOption001 = equipmentTooltip["Element_008"]["value"]["Element_000"]["contentStr"]["Element_000"]["contentStr"];
                        elixirOption001 = elixirOption001.replace(deleteTag001, "");
                        elixirOption001 = elixirOption001.match(matchTag001)[0];

                        let elixirOption002 = equipmentTooltip["Element_008"]["value"]["Element_000"]["contentStr"]["Element_001"]["contentStr"];
                        elixirOption002 = elixirOption002.replace(deleteTag001, "");
                        elixirOption002 = elixirOption002.match(matchTag001)[0];

                        if (elixirOption002 == null) {
                            elixirOption002 = "";
                        }
                        replyMsg = replyMsg
                            + elixirOption001 + elixirOption002 + "\n"
                            ;

                    } else if (checktopStr008.includes("초월")) {
                        let transcendenceName = equipmentTooltip["Element_008"]["value"]["Element_000"]["topStr"];
                        transcendenceName = transcendenceName.replace(deleteTag002, "");
                        if (transcendenceName == null) {
                            transcendenceName = "";
                        }

                        if (equipmentTooltip["Element_009"]["type"] == "IndentStringGroup") {
                            let elixirOption001 = equipmentTooltip["Element_009"]["value"]["Element_000"]["contentStr"]["Element_000"]["contentStr"];
                            elixirOption001 = elixirOption001.replace(deleteTag001, "");
                            elixirOption001 = elixirOption001.match(matchTag001)[0];

                            let elixirOption002 = equipmentTooltip["Element_009"]["value"]["Element_000"]["contentStr"]["Element_001"]["contentStr"];
                            elixirOption002 = elixirOption002.replace(deleteTag001, "");
                            elixirOption002 = elixirOption002.match(matchTag001)[0];

                            if (elixirOption002 == null) {
                                elixirOption002 = "";
                            }
                            replyMsg = replyMsg
                                + elixirOption001 + elixirOption002 + "\n"
                                ;
                        }
                        replyMsg = replyMsg
                            + transcendenceName + "\n"
                            ;
                    }
                }
            }

            qualityValueAvg /= 6;
            itemLevelAvg /= 6;
            qualityValueAvg = qualityValueAvg.toFixed(2);
            itemLevelAvg = itemLevelAvg.toFixed(2);

            replyMsg = "장비 레벨(" + itemLevelAvg + ")" + "\n"
                + " 평균 품질(" + qualityValueAvg + ")" + "\n"
                + replyMsg;

            replier.reply(replyMsg);
        });
    }
    function mainItemPrice() {
        const url = "/markets/items";

        const selectCategoryCode = {
            "CategoryCode": 50000,
            "ItemName": "파괴",
            "PageNo": 0
        };
        const selectCategoryCode2 = {
            "CategoryCode": 50000,
            "ItemName": "명예의",
            "PageNo": 0
        };
        const selectCategoryCode3 = {
            "CategoryCode": 50000,
            "ItemName": "오레하 융화 재료",
            "PageNo": 0
        };
        const selectCategoryCode4 = {
            "CategoryCode": 50000,
            "ItemName": "지혜의 정수",
            "PageNo": 0
        };
        const selectCategoryCode5 = {
            "CategoryCode": 50000,
            "ItemName": "마력석 조각",
            "PageNo": 0
        };

        let equipmentData = [];
        let 파괴;
        let 명예;
        let 오레하;
        let 엘릭서;
        let 마력석;

        callLostArkApiPost(url, selectCategoryCode, function (callback) {
            파괴 = callback;
            if (파괴 && Array.isArray(파괴.Items)) {
                var targetNames = ["파괴석 결정", "파괴강석", "정제된 파괴강석"];
                targetNames.forEach(function (targetName) {
                    var item = 파괴.Items.find(function (item) {
                        return item.Name === targetName;
                    });
                    if (item) {
                        equipmentData.push(item.Name + " : " + item.CurrentMinPrice + (targetName === "정제된 파괴강석" ? '\n ' : ''));
                    }
                });
            } else {
                replier.reply("Error: 파괴 object is invalid or Items not found");
            }
        });

        callLostArkApiPost(url, selectCategoryCode2, function (callback) {
            명예 = callback;
            if (명예 && Array.isArray(명예.Items)) {
                var targetNames = ["명예의 파편 주머니(소)", "명예의 파편 주머니(중)", "명예의 파편 주머니(대)", "위대한 명예의 돌파석", "경이로운 명예의 돌파석", "찬란한 명예의 돌파석"];
                targetNames.forEach(function (targetName) {
                    var item = 명예.Items.find(function (item) {
                        return item.Name === targetName;
                    });
                    if (item) {
                        equipmentData.push(item.Name + " : " + item.CurrentMinPrice);
                        if (targetName === "명예의 파편 주머니(대)" || targetName === "찬란한 명예의 돌파석") {
                            equipmentData.push("");
                        }
                    }
                });
            } else {
                replier.reply("Error: 명예 object is invalid or Items not found");
            }
        });

        callLostArkApiPost(url, selectCategoryCode3, function (callback) {
            오레하 = callback;
            if (오레하 && Array.isArray(오레하.Items)) {
                var targetNames = ["오레하 융화 재료", "상급 오레하 융화 재료", "최상급 오레하 융화 재료"];
                targetNames.forEach(function (targetName) {
                    var item = 오레하.Items.find(function (item) {
                        return item.Name === targetName;
                    });
                    if (item) {
                        equipmentData.push(item.Name + " : " + item.CurrentMinPrice + (targetName === "최상급 오레하 융화 재료" ? '\n ' : ''));
                    }
                });
            } else {
                replier.reply("Error: 오레하 object is invalid or Items not found");
            }
        });

        callLostArkApiPost(url, selectCategoryCode4, function (callback) {
            엘릭서 = callback;
            if (엘릭서 && Array.isArray(엘릭서.Items)) {
                var targetNames = ["선명한 지혜의 정수", "빛나는 지혜의 정수"];
                targetNames.forEach(function (targetName) {
                    var item = 엘릭서.Items.find(function (item) {
                        return item.Name === targetName;
                    });
                    if (item) {
                        equipmentData.push(item.Name + " : " + item.CurrentMinPrice);
                    }
                });
            } else {
                replier.reply("Error: 엘릭서 object is invalid or Items not found");
            }
        });

        callLostArkApiPost(url, selectCategoryCode5, function (callback) {
            마력석 = callback;
            if (마력석 && Array.isArray(마력석.Items)) {
                var targetNames = ["마력석 조각"];
                targetNames.forEach(function (targetName) {
                    var item = 마력석.Items.find(function (item) {
                        return item.Name === targetName;
                    });
                    if (item) {
                        equipmentData.push(item.Name + " : " + item.CurrentMinPrice);
                    }
                });
            } else {
                replier.reply("Error: 마력석 object is invalid or Items not found");
            }
        });

        const separatedData = equipmentData.join('\n');
        replier.reply(separatedData);

    }

    function goldDistribute() {
        const mainGold = msgParam;
        if (msgParam == null || msgParam == "") {
            replier.reply("골드를 입력해주세요.");
            return;
        } else if (isNaN(mainGold)) {
            replier.reply("숫자를 입력해주세요.");
            return;
        } else if (!(Number.isInteger(Number(mainGold)))) {
            replier.reply("정수를 입력해주세요.");
            return;
        } else {
            const fourDistribute = Math.floor((mainGold * 0.95 * 3) / 4);
            const eightDistribute = Math.floor((mainGold * 0.95 * 7) / 8);
            replier.reply("4인 : " + fourDistribute + "\n"
                + "8인 : " + eightDistribute);
        }
    }

}
