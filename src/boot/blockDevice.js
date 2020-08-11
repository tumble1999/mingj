class blockDevice extends device {
	constructor(data) {
		super(
			function read(pos = 0, type = "Uint8") {
				if (!blockDevice.types.includes(type)) return undefined;
				return this.view["get" + type](pos);
			},
			function write(block, pos = 0, type = "Uint8") {
				if (!blockDevice.types.includes(type)) return;
				this.view["set" + type](pos, block);
			}
			);
		this.data = new ArrayBuffer(data)
		this.view = new DataView(this.data);
	}
	getBlockCount(type = "Uint8") {
		if (!blockDevice.types.includes(type)) return NaN;
		this.data.byteLength / blockDevice.typeSizes[blockDevice.typeSizes.indexOf(type)]
	}
	readArray(pos=0, count=1, type = "Uint8",) {
		if (!blockDevice.types.includes(type)) return [NaN];
		count = count || this.getBlockCount(type);
		var array = [];
		for (let i = pos; i < pos + count; i++) {
			array.push(this.read(i));
		}
		return new globalThis[type + "Array"](array);
	}

	writeArray(blockArray, pos = 0, type = blockArray.constructor.name.replace("Array", "")) {
		if (!blockDevice.types.includes(type)) return;
		for (let i = pos; i < pos + blockArray.length; i++) {
			this.write(blockArray, i, type)
		}
	}
}
blockDevice.types = ["Int8",
	"Uint8",
	"Uint8Clamped",
	"Int16",
	"Uint16",
	"Int32",
	"Uint32",
	"Float32",
	"Float64",
	"BigInt64",
	"BigUint64"]
blockDevice.typeSizes = [1, 1, 1, 2, 2, 4, 4, 4, 8, 8, 8]
