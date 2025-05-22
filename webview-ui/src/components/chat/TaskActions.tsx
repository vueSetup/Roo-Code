import { useState } from "react"
import prettyBytes from "pretty-bytes"
import { useTranslation } from "react-i18next"

import { vscode } from "@/utils/vscode"
import { HistoryItem } from "@roo/shared/HistoryItem"

import { DeleteTaskDialog } from "../history/DeleteTaskDialog"
import { IconButton } from "./IconButton"

interface TaskActionsProps {
	item?: HistoryItem
	buttonsDisabled: boolean
	handleCondenseContext: (taskId: string) => void
}

export const TaskActions = ({ item, buttonsDisabled, handleCondenseContext }: TaskActionsProps) => {
	const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
	const { t } = useTranslation()

	return (
		<div className="flex flex-row gap-1">
			<IconButton
				iconClass="codicon-desktop-download"
				title={t("chat:task.export")}
				disabled={buttonsDisabled}
				onClick={() => vscode.postMessage({ type: "exportCurrentTask" })}
			/>
			{!!item?.size && item.size > 0 && (
				<>
					<IconButton
						iconClass="codicon-fold"
						title={t("chat:task.condenseContext")}
						disabled={buttonsDisabled}
						onClick={() => handleCondenseContext(item.id)}
					/>
					<div className="flex items-center">
						<IconButton
							iconClass="codicon-trash"
							title={t("chat:task.delete")}
							disabled={buttonsDisabled}
							onClick={(e) => {
								e.stopPropagation()

								if (e.shiftKey) {
									vscode.postMessage({ type: "deleteTaskWithId", text: item.id })
								} else {
									setDeleteTaskId(item.id)
								}
							}}
						/>
						<span className="ml-1 text-xs text-vscode-foreground opacity-85">{prettyBytes(item.size)}</span>
					</div>
					{deleteTaskId && (
						<DeleteTaskDialog
							taskId={deleteTaskId}
							onOpenChange={(open) => !open && setDeleteTaskId(null)}
							open
						/>
					)}
				</>
			)}
		</div>
	)
}
