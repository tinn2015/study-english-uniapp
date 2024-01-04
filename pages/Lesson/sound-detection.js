export const soundDetection = (frameBuffer) => {
	const buffer = new Uint8Array(frameBuffer);
	// 计算振幅
	let amplitude = 0;
	for (let i = 0; i < buffer.length; i += 2) {
		const sample = (buffer[i] << 8) | buffer[i + 1];
		amplitude += Math.abs(sample)
	} ;
	//计算平均振幅
	const averageAmplitude = amplitude / (buffer.length / 2);
	// 这里可以根据平均振幅的大小来判断音量
	console.log('音量大小:', averageAmplitude);
	//在这里你可以根据音量大小进行相应的操作
}