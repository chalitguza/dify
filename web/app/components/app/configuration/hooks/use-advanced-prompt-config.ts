import { useState } from 'react'
import { clone } from 'lodash-es'
import type { ChatPromptConfig, CompletionPromptConfig, ConversationHistoriesRole, PromptItem } from '@/models/debug'
import { PromptMode } from '@/models/debug'
import { ModelModeType } from '@/types/app'
import { DEFAULT_CHAT_PROMPT_CONFIG, DEFAULT_COMPLETION_PROMPT_CONFIG } from '@/config'

type Param = {
  promptMode: PromptMode
  modelModeType: ModelModeType
}

const useAdvancedPromptConfig = ({
  promptMode,
  modelModeType,
}: Param) => {
  const [chatPromptConfig, setChatPromptConfig] = useState<ChatPromptConfig>(clone(DEFAULT_CHAT_PROMPT_CONFIG))
  const [completionPromptConfig, setCompletionPromptConfig] = useState<CompletionPromptConfig>(clone(DEFAULT_COMPLETION_PROMPT_CONFIG))

  const currentAdvancedPrompt = (() => {
    if (promptMode === PromptMode.simple)
      return []

    return (modelModeType === ModelModeType.chat) ? chatPromptConfig.prompt : completionPromptConfig.prompt
  })()

  const setCurrentAdvancedPrompt = (prompt: PromptItem | PromptItem[]) => {
    if (promptMode === PromptMode.simple)
      return

    if (modelModeType === ModelModeType.chat) {
      setChatPromptConfig({
        ...chatPromptConfig,
        prompt: prompt as PromptItem[],
      })
    }
    else {
      setCompletionPromptConfig({
        ...completionPromptConfig,
        prompt: prompt as PromptItem,
      })
    }
  }

  const setConversationHistoriesRole = (conversationHistoriesRole: ConversationHistoriesRole) => {
    setCompletionPromptConfig({
      ...completionPromptConfig,
      conversation_histories_role: conversationHistoriesRole,
    })
  }
  return {
    chatPromptConfig,
    setChatPromptConfig,
    completionPromptConfig,
    setCompletionPromptConfig,
    currentAdvancedPrompt,
    setCurrentAdvancedPrompt,
    setConversationHistoriesRole,
  }
}

export default useAdvancedPromptConfig
