class charDevice extends device {
	constructor(data) {
		super(
			function read(pos = 0) {
				return this.array[pos];
			},
			function write(char, pos = 0) {
				this.array[pos] = (new String(char)).charCodeAt(0);
			}
		);
		this.array = Uint8Array.from(data, function (char) {
			return char.charCodeAt(0);
		});
	}

	readArray(pos = 0, count = 1) {
		return this.array.subarray(pos, pos + count);
	}

	writeArray(string, pos = 0) {
		for (let i = pos; i < pos + string.length; i++) {
			this.write(string, i);
		}
	}
}
