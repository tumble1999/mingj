class device {
	constructor(read, write) {
		this.write = write || function (data) { };
		this.read = read || function () { };
	}
}