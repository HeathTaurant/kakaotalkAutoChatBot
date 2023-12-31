function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    var cmd = msg.split(" ");
    if (cmd[0] == "/정보") {
        var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + cmd[1]).get();
        var data = data0.select("div.profile-ingame");
        var lv = data.select("div.level-info").select("span");
        var lv_ex = lv.get(1).ownText();
        var lv_ba = lv.get(3).ownText();
        var lv_it = data.select("div.level-info2").select("span").get(1).ownText();
        var info = data.select("div.game-info").select("span");
        var title = info.get(1).text();
        var guild = info.get(3).text();
        var pvp = info.get(5).text();
        var job = data0.select("img.profile-character-info__img").attr("alt");
        var server = data0.select("span.profile-character-info__server").text().replace("@", "");
        var engraving = data.select("div.profile-ability-engrave").select("span");
        var result = "이름 : " + cmd[1] +
            "\n직업 : " + job +
            "\n서버 : " + server +
            "\n전투 레벨 : " + lv_ba +
            "\n원정대 레벨 : " + lv_ex +
            "\n무기 레벨 : " + lv_it +
            "\n각인 : " + engraving +
            "\n칭호 : " + title +
            "\nPVP : " + pvp;
        if (guild != "-") result += "\n길드 : " + guild;
        replier.reply("[로스트아크 캐릭터 정보]\n\n" + result);
    }
}

