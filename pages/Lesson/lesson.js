import {
		reactive,
		onBeforeMount,
		ref,
		createApp,
		onMounted,
	} from 'vue'
	
export const currentParagraph = reactive({
		id: 0,
		info: {},
		index: 0
	})
// 是否在录音中， 用于控制录音动画
export const isRecording = ref(false)