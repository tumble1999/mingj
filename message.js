/**
 * @author Tumble
 */

var commandPrefixes = {};

cardboard.on("runScriptIndex", () => {

	client.World.prototype.message = function(msg) {
		var isCommand = false;

		for (const prefix in commandPrefixes) {
			if (prefix === (msg = msg.trim()).substr(0, 1)) {
				commandPrefixes[prefix](msg);
				isCommand = true;
			}
		}
		if(!isCommand) {
			this.socket.emit("message", msg)
			this.emit("M", { i: this.player.playerId, n: this.player.nickname, m: msg })

		}
	}
})
	
cardboard.on("worldCreated", (world) => {
	commandPrefixes["/"] = world.command;
})