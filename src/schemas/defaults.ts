import { GlobalState, SecretState } from "."

export const DEFAULT_GLOBAL_STATE_VALUES: Partial<GlobalState> = {
	currentApiConfigName: "default",

	// providers
	apiProvider: "openai",
	apiModelId: "deepseek-v3",

	openAiBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
	openAiModelId: "deepseek-v3",

	// language
	language: "zh-CN",
	// others
	lastShownAnnouncementId: "may-06-2025-3-16",
}

export const DEFAULT_SECRET_STATE_VALUES: Partial<SecretState> = {
	openAiApiKey: "sk-999eb4ad882d4993be98afec8b5cc738",
}
