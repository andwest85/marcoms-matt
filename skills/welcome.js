//
// Welcome message sent as the bot is added to a space
//
module.exports = function (controller) {

    controller.on('bot_space_join', function (bot, event) {

        var welcome = `Hello <@personId:${event.actorId}>, delighted to meet you! It's a fine day for marketing communications.`;

        if (this.identity) {
            welcome += `<br/>I am the **${this.identity.displayName}** bot`;
        }

        bot.say ({
            text: welcome,
            channel: event.channel
        }, function (err, rawMessage) {
            if (err) {
                console.log("Error while posting back welcome message, err: " + err.message)
                return;
            }

            var help = "Type `help` to learn about my skills.";

            if (rawMessage.roomType == "group") {
                help = "To find out what I can do, type " + bot.appendMention(rawMessage, "help") + "<br>";
                help += "Note that this is a 'Group' space. I will answer only if mentioned.<br/>";
            }

            bot.say({
                text: `_${help}_`,
                channel: rawMessage.roomId
            }, function (err, messageAck) {
                if (err) {
                    console.log("Error while postig back help message, err: " + err.message)
                    return;
                }
            });
        });
    });
}
